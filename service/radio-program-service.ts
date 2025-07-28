import type { PipelineStage } from 'mongoose'
import { RadioProgram } from '../models/RadioProgram'

class RadioProgramService {
  async schedule() {
    const lookupSchedule = {
      $lookup: {
        from: 'schedules', // Коллекция для подстановки
        localField: 'schedule',
        foreignField: '_id',
        as: 'schedule',
        pipeline: [
          {
            $addFields: {
              days: {
                $range: [
                  '$dayIndex', // Начальное значение
                  { $add: ['$dayIndex', '$dayRange'] }, // Конечное значение
                  1 // Шаг
                ]
              }
            }
          }
        ]
      }
    }
    const lookupHosts = {
      $lookup: {
        from: 'users', // Коллекция для подстановки
        localField: 'hosts',
        foreignField: '_id',
        as: 'hosts',
        pipeline: [
          // дополнительный pipeline для фильтрации/проекции
          {
            $addFields: {
              fullName: { $concat: ['$lastName', ' ', '$firstName'] } // можно вычислять из существующих
            }
          },
          {
            $project: {
              _id: 0,
              fullName: 1
              // перечисляйте только нужные поля
            }
          }
        ]
      }
    }

    // После $lookup добавляем $addFields для преобразования hosts в массив строк
    const transformHosts = {
      $addFields: {
        hosts: {
          $map: {
            input: '$hosts',
            as: 'host',
            in: '$$host.fullName' // Извлекаем fullName
          }
        }
      }
    }

    const unwindSchedule = { $unwind: '$schedule' }
    const unwindScheduleDays = { $unwind: '$schedule.days' }
    const programs = {
      $push: {
        title: '$title',
        slug: '$slug',
        startTime: '$schedule.startTime',
        dayIndex: '$schedule.dayIndex',
        duration: '$schedule.duration',
        isReplay: '$schedule.isReplay',
        isPublished: '$isPublished',
        type: '$type',
        hosts: '$hosts',
        image: '$image',
        priority: '$priority'
      }
    }
    const groupByScheduleWeekdayId = { $group: { _id: '$schedule.days', programs } }
    const sortByStartTime: PipelineStage.Sort = { $sort: { 'schedule.startTime': 1, type: 1 } }
    const sortById: PipelineStage.Sort = { $sort: { _id: 1 } }

    const result = await RadioProgram.aggregate([
      lookupSchedule,
      lookupHosts,
      transformHosts,
      unwindSchedule,
      unwindScheduleDays,
      sortByStartTime,
      groupByScheduleWeekdayId,
      sortById
    ])
    return result
  }

  async list() {
    return await RadioProgram.find({ isPublished: true }).select('title slug image')
  }

  async menuList() {
    return await RadioProgram.find({ showInMenu: true }).select('title slug')
  }

  async oneBySlug(slug: string) {
    const findBySlug = {
      $match: { slug }
    }
    const lookupHosts = {
      $lookup: {
        from: 'users', // Коллекция для подстановки
        localField: 'hosts',
        foreignField: '_id',
        as: 'hosts',
        pipeline: [
          // дополнительный pipeline для фильтрации/проекции
          {
            $addFields: {
              fullName: { $concat: ['$lastName', ' ', '$firstName'] } // можно вычислять из существующих
            }
          },
          {
            $project: {
              _id: 0,
              fullName: 1,
              avatar: 1
              // перечисляйте только нужные поля
            }
          }
        ]
      }
    }
    const lookupSchedule = {
      $lookup: {
        from: 'schedules', // Коллекция для подстановки
        localField: 'schedule',
        foreignField: '_id',
        as: 'schedule'
      }
    }
    const unwindSchedule = { $unwind: '$schedule' }

    //  // Группируем расписание по программе и по тройке duration/dayIndex/dayRange,
    //   // собираем массив startTime в каждой группе
    const groupBySchedule = {
      $group: {
        _id: {
          programId: '$_id',
          title: '$title',
          slug: '$slug',
          isPublished: '$isPublished',
          color: '$color',
          hosts: '$hosts',
          image: '$image',
          showInMenu: '$showInMenu',
          // duration: '$schedule.duration',
          dayIndex: '$schedule.dayIndex',
          dayRange: '$schedule.dayRange'
        },
        startTimes: { $push: '$schedule.startTime' }
      }
    }

    // Сортируем массив startTimes по возрастанию
    const sortStartTimes = {
      $addFields: {
        startTimes: { $sortArray: { input: '$startTimes', sortBy: 1 } }
      }
    }

    //   // Группируем уже по программе, чтобы собрать расписание в массив групп
    const groupByProgram = {
      $group: {
        _id: {
          programId: '$_id.programId',
          title: '$_id.title',
          slug: '$_id.slug',
          isPublished: '$_id.isPublished',
          color: '$_id.color',
          hosts: '$_id.hosts',
          image: '$_id.image',
          showInMenu: '$_id.showInMenu'
        },
        schedule: {
          $push: {
            duration: '$_id.duration',
            dayIndex: '$_id.dayIndex',
            dayRange: '$_id.dayRange',
            startTime: '$startTimes'
          }
        }
      }
    }

    // Преобразуем в удобный формат
    const finalFormat = {
      $project: {
        _id: 0,
        id: '$_id.programId',
        title: '$_id.title',
        slug: '$_id.slug',
        isPublished: '$_id.isPublished',
        color: '$_id.color',
        hosts: '$_id.hosts',
        showInMenu: '$_id.showInMenu',
        image: '$_id.image',
        schedule: 1
      }
    }
    const program = await RadioProgram.aggregate([
      findBySlug,
      lookupHosts,
      lookupSchedule,
      unwindSchedule,
      groupBySchedule,
      sortStartTimes,
      groupByProgram,
      finalFormat
    ])

    return program[0]
  }
}

export default new RadioProgramService()
