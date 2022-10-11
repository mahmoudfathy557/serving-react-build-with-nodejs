const db = require('../db/db')
 

const addNewProject = async (req, res) => {
  const { title, cleanImage } = req.body

  const { dataImage } = req.files
  const dataImageBuffer = dataImage[0]?.buffer

  const params = {
    Image: {
      Bytes: dataImageBuffer,
    },
  }

  AWSclient.detectText(params, async (err, text_annotations) => {
    if (err) {
      console.log('error from AWS client', err)
    } else {
      const sql = `
  INSERT INTO projects (title,clean_image,data_image,text_annotations ) VALUES (?,?,?,?);
   `
      db.getConnection((err, connection) => {
        if (err) console.log('error from opening DB session', err)
        connection.query(
          sql,
          [
            title,
            cleanImage,
            JSON.stringify(dataImage),
            JSON.stringify(text_annotations),
          ],
          (err, result) => {
            connection.destroy()

            if (err) throw err

            return res.status(201).send({
              success: true,
              msg: 'new project has been added',
            })
          }
        )
      })
    }
  })
}

const getAllProjects = async (req, res) => {
  const sql = 'SELECT * FROM projects WHERE active=1'

  db.getConnection((err, connection) => {
    if (err) console.log('error from opening DB session', err)
    connection.query(
      sql,

      (err, result) => {
        connection.destroy()

        if (err) throw err

        return res.status(201).send({
          success: true,
          msg: 'fetching projects successfully',
          data: result,
        })
      }
    )
  })
}

module.exports = {
  addNewProject,
  getAllProjects,
}
