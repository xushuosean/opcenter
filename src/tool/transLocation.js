// 将后端传过来的省市区树转化为前端组件识别的格式 2019-11-6续：后端数据更改，现可废弃
var transLocation = (locationList, depth = 3) => {
  var res = []
  for (var prov of locationList) {
    var obj = {}
    obj.id = prov.provinceId
    obj.regionType = 'PROVINCE'
    obj.label = prov.provinceName
    obj.code = prov.provinceCode
    if (prov.cityList.length > 0) {
      obj.children = []
      for (const city of prov.cityList) {
        var obj1 = {}
        obj1.id = city.cityId
        obj1.provinceId = city.provinceId
        obj1.label = city.cityName
        obj1.regionType = 'CITY'
        obj1.code = city.cityCode
        if (city.areaList.length > 0 && depth === 3) {
          obj1.children = []
          for (const area of city.areaList) {
            const obj2 = {}
            obj2.id = area.areaId
            obj2.regionType = 'AREA'
            obj2.label = area.areaName
            obj2.code = area.areaCode
            obj2.cityId = area.cityId
            obj1.children.push(obj2)
          }
        }

        obj.children.push(obj1)
      }
    }

    res.push(obj)
  }
  return res
}

export default transLocation
