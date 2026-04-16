const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");

module.exports = {
  getAllBlogs: async () => {
    const sql = `
    SELECT 
      bp.id,
      bp.title,
      bp.excerpt,
      bp.topic,
      bp.num_of_reads,
      bp.cover_image,
      bp.published_at
    FROM blog_post bp
    WHERE bp.status = 'PUBLISHED'
    ORDER BY bp.published_at DESC
  `;

    return new Promise((resolve, reject) => {
      db.query(sql, (err, rows) => {
        if (err) return reject(err);

        const result = rows.map((row) => ({
          id: row.id,
          title: row.title,
          excerpt: row.excerpt,
          topic: row.topic,
          coverImageUrl: row.cover_image
            ? `${process.env.BASE_URL}${row.cover_image}`
            : null,
          reads: row.num_of_reads,
          publishedAt: row.published_at,
          author: { name: "Lekoloane Nape Percy" },
        }));

        resolve(result);
      });
    });
  },

  adminGetAllBlogs: async () => {
    const sql = `
    SELECT 
      bp.id,
      bp.title,
      bp.excerpt,
      bp.topic,
      bp.num_of_reads,
      bp.status,
      bp.cover_image,
      bp.published_at,
      bp.created_at
    FROM blog_post bp
    ORDER BY bp.published_at DESC
  `;

    return new Promise((resolve, reject) => {
      db.query(sql, (err, rows) => {
        if (err) return reject(err);

        const result = rows.map((row) => ({
          id: row.id,
          title: row.title,
          excerpt: row.excerpt,
          topic: row.topic,
          status: row.status,
          coverImageUrl: row.cover_image
            ? `${process.env.BASE_URL}${row.cover_image}`
            : null,
          reads: row.num_of_reads,
          publishedAt: row.published_at,
          createdAt: row.created_at,
        }));

        resolve(result);
      });
    });
  },

  getBlogById: async (id) => {
    // 🔹 MAIN POST (with author JOIN)
    const postSql = `
    SELECT 
      bp.id,
      bp.title,
      bp.excerpt,
      bp.topic,
      bp.cover_image,
      bp.num_of_reads,
      bp.published_at
    FROM blog_post bp
    WHERE bp.id = ?
  `;

    const post = await new Promise((resolve, reject) => {
      db.query(postSql, [id], (err, rows) => {
        if (err) return reject(err);
        resolve(rows[0]);
      });
    });

    if (!post) return null;

    // 🔹 BLOCKS
    const blocksSql = `
    SELECT type, content, position
    FROM blog_block
    WHERE post_id = ?
    ORDER BY position ASC
  `;

    const blocks = await new Promise((resolve, reject) => {
      db.query(blocksSql, [id], (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });

    // 🔹 RELATED POSTS (same topic, exclude current, limit 6)
    const relatedSql = `
    SELECT 
      bp.id,
      bp.title,
      bp.cover_image,
      bp.num_of_reads
    FROM blog_post bp
    WHERE bp.topic = ?
      AND bp.id != ?
      AND bp.status = 'PUBLISHED'
    ORDER BY bp.num_of_reads
    LIMIT 6
  `;

    const related = await new Promise((resolve, reject) => {
      db.query(relatedSql, [post.topic, id], (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });

    // 🔹 FINAL RESPONSE
    return {
      id: post.id,
      title: post.title,
      excerpt: post.excerpt,
      topic: post.topic,
      coverImageUrl: post.cover_image
        ? `${process.env.BASE_URL}${post.cover_image}`
        : null,
      reads: post.num_of_reads,
      publishedAt: post.published_at,
      author: {
        name: "Lekoloane Nape Percy",
      },

      blocks: blocks.map((b) => ({
        type: b.type,
        content: b.content,
        position: b.position,
      })),

      related: related.map((r) => ({
        id: r.id,
        title: r.title,
        coverImageUrl: r.cover_image
          ? `${process.env.BASE_URL}${r.cover_image}`
          : null,
        reads: r.num_of_reads,
      })),
    };
  },
  //for social media bots
  getBlogShareById: async (id) => {
    const postSql = `
    SELECT 
      id,
      title,
      excerpt,
      cover_image,
      published_at
    FROM blog_post
    WHERE id = ?
      AND status = 'PUBLISHED'
    LIMIT 1
  `;

    const post = await query(postSql, [id]);

    if (!post) return null;

    return {
      id: post.id,
      title: post.title,
      excerpt: post.excerpt,
      coverImageUrl: post.cover_image
        ? `${process.env.BASE_URL}${post.cover_image}`
        : null,
      publishedAt: post.published_at,
    };
  },
  //CREATE BLOG
  createBlog: async (data) => {
    const connection = await new Promise((resolve, reject) => {
      db.getConnection((err, conn) => {
        if (err) return reject(err);
        resolve(conn);
      });
    });

    try {
      // START TRANSACTION
      await new Promise((res, rej) =>
        connection.beginTransaction((err) => (err ? rej(err) : res())),
      );

      // Insert blog post
      const insertPostSql = `
      INSERT INTO blog_post
      (id, title, excerpt, topic, cover_image, status, num_of_reads, created_at)
      VALUES (?,  ?, ?, ?, ?, 'DRAFT', 5, NOW())
    `;

      await new Promise((res, rej) =>
        connection.query(
          insertPostSql,
          [data.id, data.title, data.excerpt, data.topic, data.coverImage],
          (err) => (err ? rej(err) : res()),
        ),
      );

      // Insert blocks
      const insertBlockSql = `
      INSERT INTO blog_block (id, post_id, type, content, position)
      VALUES (?, ?, ?, ?, ?)
    `;

      let position = 1;

      for (const block of data.blocks) {
        await new Promise((res, rej) =>
          connection.query(
            insertBlockSql,
            [uuidv4(), data.id, block.type, block.content, position++],
            (err) => (err ? rej(err) : res()),
          ),
        );
      }

      // COMMIT
      await new Promise((res, rej) =>
        connection.commit((err) => (err ? rej(err) : res())),
      );

      return data.id;
    } catch (err) {
      // ROLLBACK on ANY failure
      await new Promise((res) => connection.rollback(() => res()));
      throw err;
    } finally {
      connection.release();
    }
  },

  updateBlogStatus: async (id, status) => {
    const allowed = ["DRAFT", "PUBLISHED"];

    if (!allowed.includes(status)) {
      throw new Error("Invalid status");
    }

    const sql = `
    UPDATE blog_post
    SET status = ?, 
        published_at = CASE 
          WHEN ? = 'PUBLISHED' THEN NOW()
          ELSE published_at
        END
    WHERE id = ?
  `;

    return new Promise((resolve, reject) => {
      db.query(sql, [status, status, id], (err, result) => {
        if (err) return reject(err);
        resolve(result.affectedRows > 0);
      });
    });
  },

  deleteBlog: async (id) => {
    const connection = await new Promise((resolve, reject) => {
      db.getConnection((err, conn) => {
        if (err) return reject(err);
        resolve(conn);
      });
    });

    try {
      // 🔥 start transaction
      await new Promise((res, rej) =>
        connection.beginTransaction((err) => (err ? rej(err) : res())),
      );

      // 🔹 delete blocks first (FK safety)
      await new Promise((res, rej) =>
        connection.query(
          "DELETE FROM blog_block WHERE post_id = ?",
          [id],
          (err) => (err ? rej(err) : res()),
        ),
      );

      // 🔹 delete post
      await new Promise((res, rej) =>
        connection.query("DELETE FROM blog_post WHERE id = ?", [id], (err) =>
          err ? rej(err) : res(),
        ),
      );

      // 🔥 commit
      await new Promise((res, rej) =>
        connection.commit((err) => (err ? rej(err) : res())),
      );

      return true;
    } catch (err) {
      await new Promise((res) => connection.rollback(() => res()));
      throw err;
    } finally {
      connection.release();
    }
  },
};
