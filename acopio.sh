#!/bin/bash

REGION="westeurope"

echo "Script de automatización para creación de una máquina virtual en Azure."


echo "Vamos a crear un grupo de recursos para alojar la máquina"
az group create --name MvProjectCC --location $REGION 



echo "----------------------------------------------------------------------------------"
echo "----------------------------------------------------------------------------------"
echo "----------------------------------------------------------------------------------"

echo "Creación de la Máquina Virtual"

create_output=$(az vm create -g MvProjectCC -n vmHito4 --image Canonical:UbuntuServer:18.04-LTS:latest --generate-ssh-keys)

# Obtenemos la IP pública de nuestra máquina virtual creada
Public_IP=$(echo $create_output | jq -r '.publicIpAddress')

echo "La IP de tu máquina virtual creada es $Public_IP"

# Abrimos el puerto 80 para poder acceder a la MV desde el navegador
az vm open-port --resource-group MvProjectCC --name vmHito4 --port 80


