import app from './app';
import { lessonTest } from './tests/db/lesson.service.dbtest';

app.listen(3030, () =>
  console.log(`=============
          🚀 App listening on the port 3030
          =============`),
);
