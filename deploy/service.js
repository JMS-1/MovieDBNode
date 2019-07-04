const Service = require('node-windows').Service

const svc = new Service({
    description: 'Node.Js Variante der Movie Datenbank',
    name: 'Movie Datenbank',
    nodeOptions: [],
    script: 'src/startup.js',
})

svc.on('install', () => svc.start())

svc.install()
