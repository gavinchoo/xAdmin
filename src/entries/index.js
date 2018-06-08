
/**
 *  路径需配置全路径
 */
const entryConfig = {
    web: {
        'web/admin': './src/clients/admin/admin',
        'generator/admin': './src/clients/generator/admin',
    },
    mobile: {
    },
}

function allEntry() {
    var entry = {}
    for (var key in entryConfig) {
        entry = Object.assign(entry, entryConfig[key])
    }
    return entry
}

module.exports = {entryConfig, allEntry}