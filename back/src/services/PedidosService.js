
const { sql, getConnection } = require("../config/db");

async function listarPedidos() {
    const pool = await getConnection();
    const resultado = await pool.request().execute("usp_ListarPedidos");
    return resultado.recordset;
}

async function listarArmazones() {
    const pool = await getConnection();
    const resultado = await pool.request().execute("usp_ListarArmazones");
    return resultado.recordset;
}

async function crear({ cliente, telefono, idArmazon, tipoCristal, precioTotal }) {
    const pool = await getConnection();

    const resultado = await pool.request()
        .input("Cliente", sql.NVarChar(80), cliente)
        .input("Telefono", sql.NVarChar(20), telefono)
        .input("IdArmazon", sql.Int, idArmazon)
        .input("TipoCristal", sql.NVarChar(30), tipoCristal)
        .input("PrecioTotal", sql.Decimal(12, 2), precioTotal)
        .output("IdPedido", sql.Int)
        .execute("usp_CrearPedido");

    return resultado.output.IdPedido;
}

async function avanzar(idPedido) {
    const pool = await getConnection();
    await pool.request()
        .input("IdPedido", sql.Int, idPedido)
        .execute("usp_AvanzarPedido");
}

module.exports = { listarPedidos, listarArmazones, crear, avanzar };