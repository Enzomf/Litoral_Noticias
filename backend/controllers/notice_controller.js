const getUserByToken = require("../helper/userByToken");
const Notice = require("../models/Notice");
const NoticeImages = require("../models/NoticeImages");
const Commentary = require("../models/Commentary");
const Commentary_response = require("../models/Commentary_response");
const fs = require("fs");
const User = require("../models/User");

class NoticeController {

  async getLatest(req, res){
    const latestNews = await Notice.findAll({order: [['createdAt', "DESC"]], limit:3, include:NoticeImages})

    return res.status(200).json(latestNews)
  }
  async add_notice(req, res) {
    let image_name = "";

    console.log(req.file)
    const { title, content, category, destaque } = req.body;
    let _destaque = false;
    if (destaque) {
      _destaque = true;
    }

    if (!title) {
      res.status(422).json({ message: "O titulo é obrigatório!" });
      return;
    }
    if (!content) {
      res.status(422).json({ message: "O conteúdo é obrigatório!" });
      return;
    }


    
    if (!category) {
      res.status(422).json({ message: "A categoria é obrigatória!" });
      return
    }

    let allowedCategories = [
      "esportes",
      "saude",
      "educação",
      "entreterimento",
      "politica",
    ];
    if (!allowedCategories.includes(category.toLowerCase())) {
      res.status(422).json({ message: "Insira uma categoria válida!" });
      return;
    }
    if (req.file) {
      image_name = req.file.filename;
    }

    const { name, id } = await getUserByToken(req, res);

    if (!name && !id) {
      return;
    }

    const noticeData = {
      author: name,
      userId: id,
      content,
      title,
      category,
      destaque:_destaque
    };

    try {
      const created_notice = await Notice.create(noticeData);

      if (image_name) {
        image_name = `${process.env.BASE_URL}/notice/image/${image_name}`;
        await NoticeImages.create({
          image_name: image_name,
          noticeId: created_notice.id,
        });
      }

      res.status(200).json({ message: "Noticia criada com sucesso!" });
    } catch (error) {
      console.log(error);
    }
  }

  sendImage(req, res) {
    const imageName = req.params.imageName;
    console.log(imageName);
    const path = `upload/noticeImages/`;

    res.sendFile(imageName, { root: path }, function (err) {
      if (err) {
        console.log(err);
        res.status(404).json({ message: "Imagem não encontrada" });
        return;
      }
    });
  }

  async getNotice(req, res) {
    const noticeId = req.params.noticeId;

    const notice = await Notice.findOne({
      where: { id: noticeId },
      include: [NoticeImages, Commentary, Commentary_response],
    });

    if (!notice) {
      return res.status(404).json({ message: "Noticia não encotrada!" });
    }

    res.status(200).json({ notice });
  }

  async updateNotice(req, res) {
    const { title, content } = req.body;
    const id = req.params.id;

    if (!title && !content) {
      res.status(422).json({ message: "Insira algum dado pra atualizar!" });
      return;
    }

    // pegar o id do escritor da notícia
    const { userId } = await Notice.findOne({ where: { id: id }, raw: true });
    // pegar o id do usuário logado
    const actualUserId = await getUserByToken(req, res, true);

    console.log(userId, actualUserId);

    if (userId != actualUserId) {
      res
        .status(401)
        .json({ message: "Só é possivel atualizar suas notícias!" });
      return;
    }

    try {
      await Notice.update(
        { title: title, content: content },
        { where: { id: id } }
      );

      res.status(200).json({ message: "Noticia atualizada com sucesso!" });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Ocorreu algum erro, tente novamente mais tarde" });
    }
  }

  async allNotices(req, res) {
    try {
      const notices = await Notice.findAll({ include: [NoticeImages] });

      res.status(200).json({ notices });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ message: "Ocorreu algum erro, tente novamente mais tarde" });
    }
  }

  async myNotices(req, res){
    const id =  await getUserByToken(req, res, true)

    const userNotices = await Notice.findAll({where: {
      userId:id
    }, order:[['createdAt', "DESC"]], include: NoticeImages})
  
  if(!userNotices){
    res.status(404).json({message:"Você não possui nenhuma notícia!"})
    return
  }

  res.status(200).json({userNotices})
  }



  async deleteNotice(req, res) {
    const id = req.params.id;

    const notice = await Notice.findOne({ where: { id: id } });

    // verifica se a notícia existe
    if (!notice) {
      res.status(404).json({ message: "Noticia não encontrada" });
      return;
    }

    // pegar o id do usuário logado
    const actualUserId = await getUserByToken(req, res, true);

    // verifica se a noticia pertence ao usuário
    if (notice.userId != actualUserId) {
      res
        .status(401)
        .json({ message: "Só é possivel remover suas próprias noticias!" });
      return;
    }

    // pega o nome da imagem da noticia
    let imageNames = await NoticeImages.findOne({ where: { noticeId: id } });
    if(imageNames){

      imageNames = imageNames.dataValues.image_name.split("/")[5];
    }

    try {
      // deleta a noticia e as imagens da noticia
      if(imageNames){

        fs.unlinkSync(`upload/noticeImages/${imageNames}`);
        await NoticeImages.destroy({ where: { noticeId: id } });
      }
      await Notice.destroy({ where: { id: id } });

      res.status(200).json({ message: "Noticia deletada com sucesso!" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Ocorreu algum erro, tente novamente" });
    }
  }

  async addComment(req, res) {
    const noticeID = req.params.id;

    if (!(await Notice.findOne({ where: { id: noticeID } }))) {
      res.status(404).json({ message: "Noticia não encontrada" });
      return;
    }

    const { comment } = req.body;

    const { name, id } = await getUserByToken(req, res);

    if (!comment) {
      res.status(422).json({ message: "Escreva um comentário primeiro" });
      return;
    }

    try {
      await Commentary.create({
        noticeId: noticeID,
        writter: name,
        comment: comment,
        userId: id,
      });

      res.status(200).json({ message: "Comentario adicionado com sucesso!" });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ message: "Ocorreu algum erro, tente novamente mais tarde" });
    }
  }

  async responseComment(req, res) {
    const commentId = req.params.id;

    const { content } = req.body;
    if (!content) {
      res.status(422).json({ message: "comente alguma coisa para continuar" });
      return;
    }
    const comment = await Commentary.findOne({ where: { id: commentId } });

    if (!comment) {
      return res.status(404).json({ message: "Comentario não encontrado" });
    }

    const { name, id } = await getUserByToken(req, res);

    try {
      await Commentary_response.create({
        author: name,
        content: content,
        noticeId: comment.noticeId,
        commentaryId: comment.id,
        userId: id,
      });

      res.status(200).json({ message: "Commentario respondido com sucesso!" });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ message: "Ocorreu algum erro, tente novamente mais tarde!" });
    }
  }
}

module.exports = new NoticeController();
