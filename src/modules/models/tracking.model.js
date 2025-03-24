import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";

const Tracking = sequelize.define(
  "Tracking",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    shortCode: {
      type: DataTypes.STRING(6),
      allowNull: false,
      field: "short_code",
    },
    ip: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "ip",
    },
    referer: {
      type: DataTypes.TEXT,
      field: "referer",
    },
    userAgent: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: "user_agent",
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: "created_at",
    },
  },
  {
    tableName: "tracking",
    schema: "short_url",
    timestamps: true,
    updatedAt: false,
  }
);

export default Tracking;
