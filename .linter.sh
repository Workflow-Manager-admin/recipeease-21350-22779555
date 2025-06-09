#!/bin/bash
cd /home/kavia/workspace/code-generation/recipeease-21350-22779555/recipeease_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

