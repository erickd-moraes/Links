module.exports = (sequelize, DataTypes) => {
    const Account = sequelize.define("Account", {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    // criar relacionamento Account - Link (Tem muitos...)
    Account.associate = (models) => {
        Account.hasMany(models.Link, { foreignKey: "accountId" });
    };

    // esconder o campo senha
    Account.prototype.toJSON = function () {
        const values = { ...this.get() };
        delete values.password;
        return values;
    };

    return Account;
};
