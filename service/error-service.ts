import fs from 'fs'
export default class ErrorService {
  static get dateAndTime() {
    return Intl.DateTimeFormat('ru', { year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).format(
      new Date()
    )
  }
  static append(error: unknown) {
    try {
      fs.appendFileSync('./logs/errors.txt', `${this.dateAndTime}: ${error}\n`, { encoding: 'utf-8' })
    } catch (error) {
      console.log(error)
    }
  }
  static saveStream(streamTitle?: string) {
    try {
      fs.appendFileSync('./logs/stream.txt', `${this.dateAndTime}: ${streamTitle}\n`, { encoding: 'utf-8' })
    } catch (error) {
      console.log(error)
    }
  }
}
