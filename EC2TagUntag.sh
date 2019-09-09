#!/bin/bash
RESOURCE_ID=$(aws ec2 describe-instances --region ap-southeast-1 --filters Name=tag:deploy_group,Values=green Name=tag:twitterclone_ui,Values=true --query Reservations[*].Instances[*].InstanceId | jq -r '.[] | .[0]')
aws ec2 create-tags --region ap-southeast-1 --resources $RESOURCE_ID --tags Key=deploy_group,Value=blue Key=Name,Value=twittercloneui