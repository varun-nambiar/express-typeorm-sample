import { ViewEntity, Column, BaseEntity } from "typeorm"

@ViewEntity({
  // name: 'cfg_users',
  expression: `
  SELECT * FROM cfg_users
  `
})
export default class CfgUsers extends BaseEntity {
  @Column()
  USER_ID: number

  @Column()
  USER_FULLNAME: string

  @Column()
  USER_NAME: string

  @Column()
  USER_PASSWORD: string

  @Column()
  USER_EMAIL: string

}


