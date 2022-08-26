import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"

@Entity()
export default class Users extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    length: 100
  })
  first_name: string


  @Column({
    length: 100
  })
  last_name: string


  @Column({
    length: 300
  })
  email: string

  /**
   * @returns last registered email address
   */
  static async findLastEmail(): Promise<string> {
    const row = await this.createQueryBuilder("users")
      .select('users.email', 'email')
      .orderBy('users.id', 'DESC')
      .getRawOne();

    return row.email
  }

}


