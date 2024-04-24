import fs from 'fs'

class FileService {
  readImages(src?: string) {
    return foldersMap(`./assets${src || '/images'}/`)
  }
}

export default new FileService()

function foldersMap(path: string): string[] {
  const files = fs.readdirSync(path)
  return files
    .flatMap(f => {
      const fullPath = `${path}${f}`
      return fullPath.replace('./assets', '')
    })
    .filter(path => {
      if (path.match(/\.(jpe?g|png|webp|avif)$/)) {
        return path.includes('_preview') ? path : undefined
      } else return !path.includes('.DS')
    })
}
