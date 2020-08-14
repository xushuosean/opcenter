import BaseTool from "./baseTool";

class ObjectTool extends BaseTool {
  addValidPropertyToTarget(propertyObject, target = {}) {
    const propertyObjectTag = Object.prototype.toString.call(propertyObject);
    if (propertyObjectTag === this.tag.objectTag) {
      for (let key of Object.keys(propertyObject)) {
        const value = propertyObject[key];
        if (value === undefined || value === "" || value === null) {
          continue;
        } else if (
          Object.prototype.toString.call(value) === this.tag.arrayTag &&
          value.length === 0
        ) {
          continue;
        } else {
          target[key] = propertyObject[key];
        }
      }
    }
    return target;
  }
  setProperty2Empty(object) {
    const propertyObjectTag = Object.prototype.toString.call(object);
    if (propertyObjectTag === this.tag.objectTag) {
      for (let key of Object.keys(object)) {
        const value = object[key];
        if (value === undefined || value === "" || value === null) {
          continue;
        } else {
          object[key] = "";
        }
      }
    }
    return object;
  }
}

export default new ObjectTool();
