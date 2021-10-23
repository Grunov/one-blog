module.exports = async (RoleModel, roles) => {
    await RoleModel.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            roles.forEach((role) => {
                new RoleModel({name: role}).save(err => {
                    if (err) console.log('error', err);
                    console.log(`added "${role}" to roles collection`);
                });
            });
        }
    });
}
