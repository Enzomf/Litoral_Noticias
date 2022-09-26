const getUserByToken = require("../helper/userByToken");
const Notice = require("../models/Notice");
const NoticeImages = require("../models/NoticeImages");
const Commentary = require("../models/Commentary");
const Commentary_response = require("../models/Commentary_response");

class NoticeController {
  async add_notice(req, res) {
    let image_name = "";

    const { title, content } = req.body;

    if (!title) {
      res.status(422).json({ message: "O titulo é obrigatório!" });
      return;
    }
    if (!content) {
      res.status(422).json({ message: "O conteúdo é obrigatório!" });
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
}

module.exports = new NoticeController();
