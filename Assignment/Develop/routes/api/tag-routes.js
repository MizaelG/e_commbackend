const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll(
    {
      include: {
        model: Product
      }
    }
  ).then(dbTagData => res.json(dbTagData))
  .catch(err => {
    console.log(err);
  })
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: Product
    }
  }).then(dbTagData => res.json(dbTagData))
  .catch((err) => {
    console.log(err);
  })
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.params.tag_name
  }).then(dbTagData => res.json(dbTagData))
  .catch((err) => {
    console.log(err);
  })

});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    {
      tag_name: req.body.tag_name
    },
    {
      where: {
        id: req.params.id
      }
    }).then(dbTagData => {
      if (!dbTagData) {
        res.json(404).json({ message: 'Tag not found (invalid ID)' });
        return;
      }
      res.json(dbTagData);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.delete({
    where: {
      id: req.params.id
    }
  }).then(dbTagData => {
    if (!dbTagData) {
      res.status(404).json({ message: 'Tag not found (invalid ID)' });
      return;
    }
    res.json(dbTagData);
  })
  .catch((err) => {
    console.log(err);
  })
});

module.exports = router;
