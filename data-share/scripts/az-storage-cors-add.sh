az storage cors add --methods DELETE GET HEAD MERGE OPTIONS POST PUT \
    --origins "*" \
    --allowed-headers "*" \
    --exposed-headers "*" \
    --services b \
    --max-age 86400 \
    --timeout 86400 \
    --account-key YOUR-RESOURCE-PRIMARY-KEY \
    --account-name YOUR-RESOURCE-NAME \
    --subscription YOUR-SUBSCRIPTION-ID \
    --sas-token "?sv=2020-08-04&ss=b&srt=sco&sp=rwdlacitfx&se=2022-03-01T23:46:37Z&st=2022-03-01T15:46:37Z&spr=https&sig=SBNyWtkpjKjDWcvMasytFtO8av4VL3boRGypNsOr6UA%3D"