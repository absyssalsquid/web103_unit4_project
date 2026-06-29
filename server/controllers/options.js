import { pool } from "../config/database.js";

const getTextures = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM textures')
        res.status(200).json(results.rows)
    }
    catch (error) {
        res.status(409).json({error: error.message})
    }
}

const getSizes = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM sizes')
        res.status(200).json(results.rows)
    }
    catch (error) {
        res.status(409).json({error: error.message})
    }
}

const getColors = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM colors')
        res.status(200).json(results.rows)
    }
    catch (error) {
        res.status(409).json({error: error.message})
    }
}

const getToppings = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM toppings')
        res.status(200).json(results.rows)
    }
    catch (error) {
        res.status(409).json({error: error.message})
    }
}

const getMicas = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM micas')
        res.status(200).json(results.rows)
    }
    catch (error) {
        res.status(409).json({error: error.message})
    }
}

const getGlitters = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM glitters')
        res.status(200).json(results.rows)
    }
    catch (error) {
        res.status(409).json({error: error.message})
    }
}

const getScents = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM scents')
        res.status(200).json(results.rows)
    }
    catch (error) {
        res.status(409).json({error: error.message})
    }
}

export default {
    getTextures,
    getSizes,
    getColors,
    getToppings,
    getMicas,
    getGlitters,
    getScents
}