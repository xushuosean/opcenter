const fs = require('fs')
const path = require('path')
const send = require('koa-send')

const asyncReaddir = dir => {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, (err, files) => {
      if (err) {
        reject(err)
      } else {
        resolve(files)
      }
    })
  })
}

const pathMapping = new Map()

const functionFactory = (paht, params, paramsCanBeNull, method, result) => {
  return function(ctx, next) {
    let requestParams
    if (paht.includes(':')) {
      requestParams = ctx.params
    } else {
      requestParams =
        method.toUpperCase().trim() === 'GET'
          ? Object.keys(ctx.query).length === 0
            ? ctx.params
            : ctx.query
          : ctx.request.body
    }
    if (params) {
      for (let i = 0; i < params.length; i++) {
        const temp = requestParams[params[i]]
        if (
          (temp === null || temp === undefined || temp === '') &&
          (!paramsCanBeNull || !paramsCanBeNull.includes(params[i]))
        ) {
          ctx.response.body = `
            参数错误，错误参数为${params[i]},
            获取到的参数值为${temp},
            接收到的参数为${JSON.stringify(requestParams)}，
            期待的参数列表为${params},
            可为空的参数为${paramsCanBeNull}
          `
          return
        }
      }
    }
    ctx.state = 200
    ctx.response.body = JSON.stringify(result)
  }
}

const addRouter = async(router, dir) => {
  dir = dir || path.join(__dirname, './apiJson')
  const files = await asyncReaddir(dir)
  for (let i = 0; i < files.length; i++) {
    if (files[i].endsWith('.json')) {
      const fileJson = await require(`${dir}/${files[i]}`)
      if (!fileJson.length || fileJson.length === 0) {
        continue
      }
      for (let y = 0; y < fileJson.length; y++) {
        pathMapping.set(
          `${fileJson[y].method.toUpperCase().trim()} ${fileJson[y].path}`,
          functionFactory(
            fileJson[y].path,
            fileJson[y].params,
            fileJson[y].paramsCanBeNull,
            fileJson[y].method,
            fileJson[y].result
          )
        )
      }
    }
  }
  addMapping(router)
}

const addMapping = router => {
  for (const key of pathMapping.keys()) {
    if (key.startsWith('GET ')) {
      const path = key.slice(4)
      router.get(path, pathMapping.get(key))
    } else if (key.startsWith('POST ')) {
      const path = key.slice(5)
      router.post(path, pathMapping.get(key))
    } else if (key.startsWith('PUT ')) {
      const path = key.slice(4)
      router.put(path, pathMapping.get(key))
    } else if (key.startsWith('DELETE ')) {
      const path = key.slice(7)
      router.delete(path, pathMapping.get(key))
    } else if (key.startsWith('HEAD ')) {
      const path = key.slice(5)
      router.head(path, pathMapping.get(key))
    } else {
      throw new Error('invalid request method name')
    }
  }
}

module.exports = async dir => {
  const router = require('koa-router')()
  await addRouter(router, dir)

  router.get('/*', async(ctx, next) => {
    if (
      ctx.path.endsWith('.jpg') ||
      ctx.path.endsWith('.png') ||
      ctx.path.endsWith('.gif')
    ) {
      const rootPathArray = __dirname.split('\\')
      const imageType = ctx.path.slice(ctx.path.indexOf('.') + 1)
      const rootPath = path.join(...rootPathArray)
      ctx.response.set('Content-Type', `image/${imageType}`)
      ctx.body = fs.createReadStream(rootPath + ctx.path)
    } else {
      await next()
    }
  })

  const multer = require('koa-multer')
  const storageImg = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, path.join(__dirname, './img/'))
    },
    filename: function(req, file, cb) {
      const fileFormat = file.originalname.split('.')
      cb(null, Date.now() + '.' + fileFormat[fileFormat.length - 1])
    }
  })
  const uploadImg = multer({
    storage: storageImg
  })
  router.post(
    '/picture/upload.json',
    uploadImg.single('file'),
    async(ctx, next) => {
      ctx.body = {
        type: '000000',
        message: 'success',
        data: `/img/${ctx.req.file.filename}`
      }
    }
  )
  const storageFile = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './file/')
    },
    filename: function(req, file, cb) {
      const fileFormat = file.originalname.split('.')
      cb(null, Date.now() + '.' + fileFormat[fileFormat.length - 1])
    }
  })
  const uploadFile = multer({
    storage: storageFile
  })
  router.post(
    '/cardDef/uploadCardCsv',
    uploadFile.single('file'),
    async(ctx, next) => {
      ctx.body = {
        type: '000000',
        message: 'success',
        data: {
          url: `/img/${ctx.req.file.filename}`
        }
      }
    }
  )
  router.post('/order/undelivered/export', async function(ctx) {
    var fileName = './file/test.xlsx'
    ctx.attachment(fileName)
    await send(ctx, fileName)
  })
  return router.routes()
}
