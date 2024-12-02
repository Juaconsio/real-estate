import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

interface FavoriteAttributes {
  id: number;
  userId: number;
  property_url: string;
}
interface FavoriteCreationAttributes extends Optional<FavoriteAttributes, 'id'> { }

class Favorite extends Model<FavoriteAttributes, FavoriteCreationAttributes> implements FavoriteAttributes {
  public id!: number;
  public userId!: number;
  public property_url!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const initFavoriteModel = (sequelize: Sequelize) => {
  Favorite.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      property_url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'favorites',
    }
  );

  return Favorite;
};

export default Favorite;