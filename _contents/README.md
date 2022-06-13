# Page contents

##

### Front-matter

You can place meta data into Front-matter like this.

```markdown
---
id: 1
query: "ウェブカメラ おすすめ"
title: "購入するウェブカメラのメーカー探し"
...

---
```

## Task descriptions

You should place Markdown style task descriptions in `_contents/tasks/`.

### Available front-matter fields

| Field name | Field type | Description  |
| ---------- | ---------- | ------------ |
| id\*       | number     | task ID      |
| query\*    | string     | Search query |
| title\*    | string     | Task title   |

\* : Required

## Enquete descriptions

You should place Markdown style enquetes descriptions in `_contents/enquetes/`.

### Available front-matter fields

| Field name | Field type | Description      |
| ---------- | ---------- | ---------------- |
| slug\*     | string     | Unique ID        |
| title\*    | string     | Task title       |
| url\*      | string     | Enquete form URL |

\* : Required
