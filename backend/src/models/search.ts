import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

interface SearchAttributes {
  id: number;
  userId: number;
  contract: string;
  type: string;
  address: string;
}
interface SearchCreationAttributes extends Optional<SearchAttributes, 'id'> { }

class Search extends Model<SearchAttributes, SearchCreationAttributes> implements SearchAttributes {
  public id!: number;
  public userId!: number;
  public contract!: string;
  public type!: string;
  public address!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const initSearchModel = (sequelize: Sequelize) => {
  Search.init(
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
      contract: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'Searchs',
    }
  );

  return Search;
};

export default Search;