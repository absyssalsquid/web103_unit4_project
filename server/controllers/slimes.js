import { pool } from "../config/database.js";

const BASE_QUERY = `
    SELECT 
        s.id,
        (
            SELECT json_build_object('name', t.name, 'image', t.image, 'price', t.price)
            FROM textures t
            WHERE t.name = s.texture
        ) AS texture,
        (
            SELECT json_build_object('name', sz.name, 'qty', sz.qty, 'price_mult', sz.price_mult)
            FROM sizes sz
            WHERE sz.name = s.slime_size
        ) AS slime_size,
        s.scent,
        -- Colors with hex codes
        (
            SELECT json_agg(json_build_object('name', c.name, 'hex', c.hex))
            FROM slime_colors sc
            JOIN colors c ON sc.color = c.name
            WHERE sc.slime_id = s.id
        ) AS colors,
        -- Toppings with prices
        (
            SELECT json_agg(json_build_object('name', t.name, 'price', t.price, 'image', t.image))
            FROM slime_toppings st
            JOIN toppings t ON st.topping = t.name
            WHERE st.slime_id = s.id
        ) AS toppings,
        -- Glitters with prices and image
        (
            SELECT json_agg(json_build_object('name', g.name, 'price', g.price, 'image', g.image))
            FROM slime_glitters sg
            JOIN glitters g ON sg.glitter = g.name
            WHERE sg.slime_id = s.id
        ) AS glitters,
        -- Micas with prices
        (
            SELECT json_agg(json_build_object('name', m.name, 'hex', m.hex, 'price', m.price))
            FROM slime_micas sm
            JOIN micas m ON sm.mica = m.name
            WHERE sm.slime_id = s.id
        ) AS micas
    FROM slimes s
`

const getItems = async (req, res) => {
    try {
        const results = await pool.query(BASE_QUERY + ` ORDER BY s.id`)
        res.status(200).json(results.rows)
  } catch (error) {
      res.status(409).json( { error: error.message } )
  }
}

const getItemByID = async (req, res) => {
    try {
        const id  = req.params.id;
        const query = BASE_QUERY +  ` WHERE id = $1`
        const { rows } = await pool.query(query, [id])
        if (rows.length === 0) {
            res.status(404).json({ error: 'slime not found' })
            return
        }
        res.status(200).json(rows[0])
    } catch (err) {
        console.error('Error fetching slime by ID:', err)
        res.status(409).json({ error: err.message })
    }
}

const createItem = async (req, res) => {
    try {
        const { texture, scent, slime_size } = req.body
        const { colors, micas, glitters, toppings } = req.body
        console.log(colors, micas, glitters, toppings)

        console.log(`creating slime`, texture, scent, slime_size )
        const results = await pool.query(`
            INSERT INTO slimes (texture, scent, slime_size) VALUES ($1, $2, $3) RETURNING *`,
            [texture, scent, slime_size]
        )

        console.log('createItem results', results.rows)
        const id = results.rows[0].id

        for (const c of colors)
            console.log(c)


        for (const c of colors)
            await pool.query('INSERT INTO slime_colors (slime_id, color) VALUES ($1, $2)', [id, c])

        for (const m of micas)
            await pool.query('INSERT INTO slime_micas (slime_id, mica) VALUES ($1, $2)', [id, m])

        for (const g of glitters)
            await pool.query('INSERT INTO slime_glitters (slime_id, glitter) VALUES ($1, $2)', [id, g])

        for (const t of toppings)
            await pool.query('INSERT INTO slime_toppings (slime_id, topping) VALUES ($1, $2)', [id, t])

        res.status(200).json(results.rows[0])
    }
    catch (error) {
        res.status(409).json( { error: error.message } )
        console.log(error.message)
  }
}

const updateItem = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const { texture, scent, slime_size } = req.body
        const { colors, micas, glitters, toppings } = req.body
        console.log(`updating slime ${id}`, texture, scent, slime_size )

        await pool.query(`DELETE FROM slime_colors WHERE slime_id = $1;`, [id])
        await pool.query(`DELETE FROM slime_micas WHERE slime_id = $1;`, [id])
        await pool.query(`DELETE FROM slime_toppings WHERE slime_id = $1;`, [id])
        await pool.query(`DELETE FROM slime_glitters WHERE slime_id = $1;`, [id])

        for (const c of colors)
            await pool.query('INSERT INTO slime_colors (slime_id, color) VALUES ($1, $2)', [id, c])

        for (const m of micas)
            await pool.query('INSERT INTO slime_micas (slime_id, mica) VALUES ($1, $2)', [id, m])

        for (const g of glitters)
            await pool.query('INSERT INTO slime_glitters (slime_id, glitter) VALUES ($1, $2)', [id, g])

        for (const t of toppings)
            await pool.query('INSERT INTO slime_toppings (slime_id, topping) VALUES ($1, $2)', [id, t])

        const results = await pool.query(`
            UPDATE slimes SET texture = $1, scent = $2, slime_size = $3 WHERE id = $4`,
            [texture, scent, slime_size, id]
        )
        res.status(200).json(results.rows[0])
  } catch (error) {
      res.status(409).json( { error: error.message } )
  }
}

const deleteItem = async (req, response) => {
    try {
        const id = parseInt(req.params.id)
        console.log(`deleting slime ${id}`)
        
        await pool.query(`DELETE FROM slime_colors WHERE slime_id = $1;`, [id])
        await pool.query(`DELETE FROM slime_micas WHERE slime_id = $1;`, [id])
        await pool.query(`DELETE FROM slime_toppings WHERE slime_id = $1;`, [id])
        await pool.query(`DELETE FROM slime_glitters WHERE slime_id = $1;`, [id])

        const results = await pool.query('DELETE FROM slimes WHERE id = $1', [id])
        response.status(200).json(results.rows[0])
    }
    catch (error){
        response.status(409).json( { error: error.message } )
        console.log(error.message)
    }
}

export default {
    getItems,
    getItemByID,
    createItem,
    updateItem,
    deleteItem
}