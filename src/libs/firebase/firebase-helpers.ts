export const addEntityId = (doc: any): any => {
  return { ...doc.data(), id: doc.id };
}

export const timestampToDateTime = (entity: any): any => {
  for (const key of Object.keys(entity)) {
    if (entity[key].toDate) {
      entity[key] = entity[key].toDate();
    } 
  }
  return entity;
}
