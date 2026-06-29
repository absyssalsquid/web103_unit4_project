import { pool } from './database.js'
import './dotenv.js'
import optionData from '../data/options.js'
import slimeData from '../data/slimes.js'

const createTables = async (query) => {
    try {
        await pool.query(query)
        console.log('🎉 tables created successfully')
    } catch (err) {
        console.error('⚠️ error creating tables', err)
    }
}

const seedTable = async (data, table, cols) => {
    const idxs = cols.map((el, idx) => `$${idx+1}`)
    const insertQuery = `INSERT INTO ${table} (${cols.join(', ')}) VALUES (${idxs.join(', ')})`;

    for (const entry of data){
        const values = cols.map(el => entry[el]);
        try {
            await pool.query(insertQuery, values)
            console.log(`✅ ${values[0]} added successfully`)
        } catch (err) {
            console.error(`⚠️ error inserting into ${table}: ${values[0]}`, err)
        }
    }
}

const seedTableJoin = async (data, key, table, col) => {
    console.log(`seeding ${table}`)
    let query = `INSERT INTO ${table} (slime_id, ${col}) VALUES ($1, $2)`;

    for (let i = 0; i < data.length; i++) {
        const entry = data[i];
        for (const val of entry[key]){
            const values = [i+1, val]
            try {
                await pool.query(query, values)
                console.log(`✅ ${values} added successfully`)
            } catch (err) {
                console.error(`⚠️ error inserting into ${table}: ${values}`, err)
            }
        }
    }
}

const seedTables = async () => {
    await seedTable(optionData.textures, 'textures' , ['name', 'price', 'image']);
    await seedTable(optionData.sizes,    'sizes'    , ['name', 'price_mult', 'qty']);
    await seedTable(optionData.colors,   'colors'   , ['name', 'price', 'hex']);
    await seedTable(optionData.toppings, 'toppings' , ['name', 'price', 'image']);
    await seedTable(optionData.micas,    'micas'    , ['name', 'price', 'hex']);
    await seedTable(optionData.glitters, 'glitters' , ['name', 'price', 'image']);
    await seedTable(optionData.scents,   'scents'   , ['name', 'price']);
    
    await seedTable(slimeData,   'slimes'   , ['texture', 'slime_size', 'scent']);

    await seedTableJoin(slimeData, 'colors', 'slime_colors', 'color')
    await seedTableJoin(slimeData, 'toppings', 'slime_toppings', 'topping')
    await seedTableJoin(slimeData, 'micas', 'slime_micas', 'mica')
    await seedTableJoin(slimeData, 'glitters', 'slime_glitters', 'glitter')
}

const seedAll = async () => {
    const deleteTablesQuery = `
        DROP TABLE IF EXISTS slime_colors;
        DROP TABLE IF EXISTS slime_toppings;
        DROP TABLE IF EXISTS slime_glitters;
        DROP TABLE IF EXISTS slime_micas;
        DROP TABLE IF EXISTS slimes;

        DROP TABLE IF EXISTS textures;
        DROP TABLE IF EXISTS sizes;
        DROP TABLE IF EXISTS colors;
        DROP TABLE IF EXISTS toppings;
        DROP TABLE IF EXISTS glitters;
        DROP TABLE IF EXISTS micas;
        DROP TABLE IF EXISTS scents;
    `
    await createTables(deleteTablesQuery)

    const createOptionsTablesQuery = `
        CREATE TABLE IF NOT EXISTS textures(
            name TEXT PRIMARY KEY,
            price DECIMAL NOT NULL,
            image TEXT NOT NULL
        );
            
        CREATE TABLE IF NOT EXISTS sizes(
            name VARCHAR(8) PRIMARY KEY,
            qty VARCHAR(25),
            price_mult DECIMAL NOT NULL
        );

        CREATE TABLE IF NOT EXISTS colors(
            name TEXT PRIMARY KEY,
            price DECIMAL NOT NULL,
            hex VARCHAR(7)
        );
        
        CREATE TABLE IF NOT EXISTS toppings(
            name TEXT PRIMARY KEY,
            price DECIMAL NOT NULL,
            image TEXT NULL
        );

        CREATE TABLE IF NOT EXISTS glitters(
            name TEXT PRIMARY KEY,
            price DECIMAL NOT NULL,
            image TEXT NOT NULL
        );
        
        CREATE TABLE IF NOT EXISTS micas(
            name TEXT PRIMARY KEY,
            price DECIMAL NOT NULL,
            hex VARCHAR(7)
        );
        
        CREATE TABLE IF NOT EXISTS scents(
            name TEXT PRIMARY KEY,
            price DECIMAL NOT NULL
        );
    `
    await createTables(createOptionsTablesQuery)

    const createSlimesTableQuery = `
        CREATE TABLE IF NOT EXISTS slimes(
            id SERIAL PRIMARY KEY,
            texture TEXT REFERENCES textures(name),
            slime_size VARCHAR(8) REFERENCES sizes(name),
            scent TEXT REFERENCES scents(name)
        );

        CREATE TABLE IF NOT EXISTS slime_colors (
            slime_id INT REFERENCES slimes(id),
            color TEXT REFERENCES colors(name),
            PRIMARY KEY (slime_id, color)
        );

        CREATE TABLE IF NOT EXISTS slime_toppings (
            slime_id INT REFERENCES slimes(id),
            topping TEXT REFERENCES toppings(name),
            PRIMARY KEY (slime_id, topping)
        );

        CREATE TABLE IF NOT EXISTS slime_glitters (
            slime_id INT REFERENCES slimes(id),
            glitter TEXT REFERENCES glitters(name),
            PRIMARY KEY (slime_id, glitter)
        );

        CREATE TABLE IF NOT EXISTS slime_micas (
            slime_id INT REFERENCES slimes(id),
            mica TEXT REFERENCES micas(name),
            PRIMARY KEY (slime_id, mica)
        );
    `
    await createTables(createSlimesTableQuery)

    await seedTables()
}

seedAll()