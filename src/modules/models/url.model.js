import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";

const Url = sequelize.define(
  "Url",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    originalUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "orig_url",
    },
    shortCode: {
      type: DataTypes.STRING(6),
      allowNull: false,
      field: "short_code",
    },
    clicks: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      defaultValue: 0,
      field: "clicks",
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: "created_at",
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "updated_at",
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "deleted_at",
    },
  },
  {
    tableName: "urls",
    schema: "short_url",
    timestamps: true,
  }
);

export default Url;
