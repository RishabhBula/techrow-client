#!/bin/bash

curl "https://api.learnworlds.com/oauth2/access_token" \
  -H "Lw-Client: 5e7531d798cabfc868194676" \
  -d data='{"client_id":"5e7531d798cabfc868194676","client_secret":"dKJsJmhDoJVHNioweMFR8tLVzMGU4So6auqxfBBqib8ojfpZBW","grant_type":"client_credentials"}' | json_pp