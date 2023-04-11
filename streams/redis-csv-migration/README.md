- build:

  ```
  docker build -t redis-csv-migration .
  ```

- backup:

  ```
  docker run --rm -v $PWD/backup/:/usr/src/app/data/ --network host -e REDIS_BACKUP_URL=redis://localhost:6379 redis-csv-migration npm run backup

  ```

- restore:

  ```
  docker run --rm -v $PWD/backup/:/usr/src/app/data/ --network host -e REDIS_BACKUP_URL=redis://localhost:6380 redis-csv-migration npm run restore

  ```