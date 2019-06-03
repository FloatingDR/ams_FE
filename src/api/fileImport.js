import { SERVER_BASE, http } from './config'

export default {
  infoImport(type,file) {
    return http.post(SERVER_BASE + '/import/upload/?type='+type,file)
  },
}
