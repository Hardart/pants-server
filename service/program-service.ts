import { Program } from '../models/Program'
import type { PipelineStage } from 'mongoose'
class ProgramService {
  async schedule() {
    const programs = {
      $push: {
        title: '$title',
        start: { $concat: [ '$schedule.properties.start.hh', ':', '$schedule.properties.start.mm' ] },
        end: { $concat: [ '$schedule.properties.end.hh', ':', '$schedule.properties.end.mm' ] },
        isReplay: '$schedule.properties.isReplay',
        hosts: '$hosts',
        image: '$image',
      }
    }
    const unwindSchedule = { $unwind: '$schedule' }
    const unwindWeekdayIds = { $unwind: '$schedule.weekdayIds' }
    const unwindProps = { $unwind: '$schedule.properties' }
    const sortByStartHour: PipelineStage.Sort = { $sort: { 'schedule.properties.start.hh': 1 } }
    const groupByWeekdayIds = { $group: { _id: '$schedule.weekdayIds', programs } }
    const sortById: PipelineStage.Sort = { $sort: { _id: 1 } }
    
    return await Program.aggregate([
      unwindSchedule, unwindWeekdayIds, unwindProps, sortByStartHour, groupByWeekdayIds, sortById
    ])
    
  }

  async list() {
    return await Program.find().select('title slug image')
  }

  async menuList() {
    return await Program.find().select('title slug')
  }

  async oneBySlug(slug: string) {
    const program = await Program.findOne({slug}).select('-color')
    const schedule = program?.schedule.map(sch => ({
      properties: sch.properties.map(p => ({start: `${p.start?.hh}:${p.start?.mm}`, end: `${p.end?.hh}:${p.end?.mm}`, isReplay: p.isReplay})),
      weekdayIds: sch.weekdayIds
    }))
    
    const transformedProgram = {...program?.toJSON(), schedule}
    return transformedProgram
  }

}

export default new ProgramService()

