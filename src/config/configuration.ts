export default ()=>({
    swagger : {
        title: 'API PROJET QUEST',
        description: 'API principal développé avec NESTJS pour la plateforme web',
        version: 'V.0.0.1',
        url: 'api/docs',
    },

    mail:{ 
        host: 'smtp.gmail.com',
        port: {ssl: 465, tls: 587, none: 25, mailtrap: 2525}, 
        secure: {oui: true, non: false},
        tls: { ciphers: 'SSLv3' },
        auth: {user: 'jkp@jkp.com', pass: 'jkp'},
        from: "Gentech '<no-reply@gentech.app>'",
        noreply: "Gentech '<no-reply@gentech.app>'"

    },
});