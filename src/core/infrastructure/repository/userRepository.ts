import { TestModel } from '../model/mongodb/testmodel.mongo'
import { NewUserDTO } from '../../domain/dto/newUserDTO'

export class UserRepository {
  async saveUser (data: NewUserDTO) {
    const _save = new TestModel(data.serialize())
    _save.save()
    return _save
  }

  async getUserList () {
    const _data = TestModel.find()
    return _data
  }

  async getUserInfo (_id) {
    const _data = TestModel.findOne({ _id })
      .select('_id nombre apellido email cedula createdAt updatedAt')
    return _data
  }
}
