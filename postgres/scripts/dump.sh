#!/bin/sh

pg_dump -O -x -U ${POSTGRES_USER} ${POSTGRES_DB} > "/dumps/${POSTGRES_DB}.sql"