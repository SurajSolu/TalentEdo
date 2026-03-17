#!/bin/bash
cd /opt/render/project/src/backend
python seed.py
uvicorn main:app --host 0.0.0.0 --port $PORT
