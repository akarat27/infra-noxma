#!/bin/bash

name=noxma.mongod
program=bin/mongod
path=/home/noxma

install() {
 echo "install"
#  cygrunsrv -I $name \
#    -p $program \
#    -c $path \
#    -t auto
}

remove() {
  echo "cygrunsrv -R $name"
}

start() {
  #echo "cygrunsrv -S $name"
  echo "Start mongoDb deamon" 
  $program --config $path/mongodb-linux-x86_64-ubuntu1604-3.4.4/bin/mongod.conf
}

stop() {
  #echo "cygrunsrv -E $name"
  echo "Stopping mongod deamon process"
  #pid=$(<config.txt)
  pid=`cat ./bin/mongo.pid`
  echo "$pid is killed"
  ps -ef | grep $pid | grep -v grep | awk '{print $2}' | xargs kill
  echo `ps -ef | grep $pid`
}

status() {
  #echo "cygrunsrv -Q $name"
  echo "mongod deamon process staus .."
  pid=`cat ./bin/mongo.pid`
  echo `ps -ef | grep $pid | grep -v grep`  
}

case "$1" in
  install)
    install
    ;;
  remove)
    stop
    remove
    ;;
  start)
    start
    ;;
  stop)
    stop
    ;;
  restart)
    stop
    start
    ;;
  status)
    status
    ;;
  *)
    echo "Usage: $0 install|remove|start|stop|restart|status" >&2
    exit 3
    ;;
esac
