import {
  Table,
  Column,
  Model,
  BeforeUpdate,
  BeforeCreate,
} from 'sequelize-typescript';

@Table
export class User extends Model<User> {
  @Column
  name: string;

  @Column
  age: number;

  @BeforeUpdate
  @BeforeCreate
  static makeUpperCase(instance: User) {
    // this will be called when an instance is created or updated
    instance.name = 'aaaaaaa';

    instance.age = 111;
  }
  @BeforeCreate
  static addUnicorn(instance: User) {
    // this will also be called when an instance is created
    instance.name += 'qq';
  }
}
