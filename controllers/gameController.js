const db = require('../db')

//exibir os dados da tabela jogos
exports.getAll = (req, res) => {
    console.log('GET /api/jogos chamado');
    const sql = 'select * from jogos'
    db.query(sql, (erro, resultado) => {
        if(erro) return res.status(500).json({erro: erro})
            res.json(resultado)
    })
}

//criar registros na tabela jogos
exports.create = (req, res) => {
    console.log('POST /api/jogos chamado', req.body);
    const {nome, tipo, ano} = req.body;
    const sql = 'insert into jogos (nome, tipo, ano) values (?, ?, ?)'
    db.query(sql, [nome, tipo, ano], (erro) => {
        if(erro) return res.status(500).json({erro: erro})
            res.status(201).json({ mensagem: 'Jogo criado com sucesso!!' })
    })
}

//atualizar registros da tabela jogos
exports.update = (req, res) => {
    console.log('PUT /api/jogos/:id chamado', req.params, req.body);
    const {id} = req.params;
    const {nome, tipo, ano} = req.body;
    const sql = 'update jogos set nome = ?, tipo = ?, ano = ? where id = ?'
    db.query(sql, [nome, tipo, ano, id], (erro) => {
        if(erro) return res.status(500).json({erro: erro})
            res.json({ mensagem: 'Jogo atualizado com sucesso!!' })
    })
}

// Excluir registros da tabela jogos
exports.delete = (req, res) => {
    console.log('DELETE /api/jogos/:id chamado', req.params);
    const {id} = req.params;
    const sql = 'delete from jogos where id = ?'
    db.query(sql, [id], (erro) => {
        if(erro) return res.status(500).json({erro: erro})
            res.json({ mensagem: 'Jogo excluido com sucesso!!' })
    })
}