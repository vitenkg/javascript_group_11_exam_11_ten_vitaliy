const mongoose = require('mongoose');
const config = require('./config');
const {nanoid} = require('nanoid');
const Category = require('./models/Category');
const Item = require('./models/Item');
const User = require('./models/User');

const run = async () => {
    await mongoose.connect(config.db.url);

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (const coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    const [computerCategory, carCategory, otherCategory] = await Category.create({
            title: "Computers",
        }, {
            title: 'Cars',
        }, {
            title: 'Other',
        },
    );

    const [admin, test] = await User.create({
            username: 'admin',
            password: 'admin',
            name: 'Administrator',
            phone: '+996555111222',
            token: nanoid(),
        }, {
            username: 'test',
            password: 'test',
            name: 'Tester',
            phone: '+996444333222',
            token: nanoid(),
        }
    );

    await Item.create({
        title: 'HP Pavilion 14-dv0603na 14" Laptop - Intel® Pentium® Gold, 128 GB SSD, Silver',
        price: 500,
        description: 'Производительность ноутбука IdeaPad 1 14, созданного, чтобы стать вашим надежным помощником на долгое время, выходит за рамки представлений о ноутбуках начального уровня. Мобильные процессоры Intel Celeron предоставляют технологическую базу, на которую можно положиться, и обеспечивают эффективную обработку не только повседневных, но и многих других задач.',
        category: computerCategory,
        image: 'fixtures/Lenovo IdeaPad 1.jpg',
        user: admin,
    }, {
        title: 'Ноутбук 14" Intel Celeron J3455/Intel UHD Graphics 600 (6+256GB SSD)',
        price: 400,
        description: 'Полная совместимость с широким спектром программного обеспечения и периферийных устройств. Ноутбук идеально подходит для студентов и школьников.',
        category: computerCategory,
        image: 'fixtures/Intel Celeron.jpg',
        user: admin,
    },{
        title: 'Lexus ES200 2021',
        price: 40000,
        description: 'На международном автосалоне в Пекине в апреле 2018 года дебютировал среднеразмерный седан Lexus ES седьмого поколения. Новый ES построен на платформе GA-K, на эту же базу опирается последняя Toyota Camry. GA-K — разновидность модульной базы TNGA, которая используется для многих Тойот последней волны. Производитель при этом отмечает преимущества данной платформы для формирования низких и широких пропорций автомобиля. Обтекаемый кузов новой машины выполнен в стиле купе. Относительно модели уходящего поколения ES стал на 65 мм длиннее, на 45 шире и на 5 мм ниже, колесная база увеличилась на 50 мм. Cтало больше места над головой задних пассажиров — этого добились благодаря более низкой точке сиденья. Помимо прочего, у нового седана расстояние между передним и задним рядами сидений увеличилось до 1025 мм, что обеспечивает больший комфорт. Модель Lexus ES200 оснащается 2,0-литровым рядным 4-цилиндровым двигателем мощностью 150 л.с. ',
        category: carCategory,
        image: 'fixtures/lexus_es200.jpg',
        user: admin,
    },{
        title: 'BMW M5 Edition 35 Years',
        price: 70000,
        description: 'На протяжении многих лет BMW M5 является одним из самых ярких автомобилей на рынке в сегменте спортивных седанов. Практичная машина, которая по динамике превосходит иные спорткары, впервые появилась 35 лет назад. По случаю юбилея в Мюнхене подготовили специальное исполнение BMW M5 — Edition 35 Years.',
        category: carCategory,
        image: 'fixtures/bmw_m5.jpg',
        user: test,

    },{
        title: 'Кофемашина DeLonghi Dinamica ECAM 350.55',
        price: 200,
        description: 'Кофемашина Delonghi ECAM350.55 поможет в короткий срок приготовить бодрящий напиток дома или в офисе. Понятная панель управления с LED-дисплеем и русифицированным меню позволяет легко выбрать необходимые настройки. Модель мощностью 1450 Вт способна заварить одну чашку всего за 30 с. Давление 15 бар сохраняет аромат и насыщенный вкус зерен за счет быстрого процесса приготовления. Встроенная кофемолка оснащена 13 регулируемыми степенями помола и может за одно применение измельчить 300 г зерен. Подсветка кнопок сориентирует, какая программа запущена в данный момент. Съемный резервуар для воды объемом 1,8 л рассчитан более чем на 10 порций. Встроенная насадка автоматически взбивает молочную пену до однородной консистенции. С кофемашиной Delonghi ECAM350.55 можно готовить до двух чашек одновременно. Настройки позволяют выбирать латте, капучино или эспрессо, создавая оптимальную температуру для каждого напитка.',
        category: otherCategory,
        image: 'fixtures/cofe_machine.jpg',
        user: test,
    },{
        title: 'Pepsi max, 2 л',
        price: 40,
        description: 'Pepsi — безалкогольный газированный напиток, производимый американской компанией PepsiCo.',
        category: otherCategory,
        image: 'fixtures/pepsi.jpg',
        user: test,
    });



    await mongoose.connection.close();
};

run().catch(console.error);