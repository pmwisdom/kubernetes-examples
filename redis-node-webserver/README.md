# Redis Node Webserver

This shows configuration of a node webserver with a redis store.

I started following this tutorial https://kubernetes.io/docs/tutorials/stateless-application/guestbook/ but the tutorial didn't expose the code related to actually connecting the service to the redis server so I took it upon myself to figure that part out. The code is located in `src/server.ts`.

Requirements to run:

1. minkiube installed
2. Kubectrl installed

Instructions to run:

1. `minikube start`
2. `minikube tunnel`
3. Apply all yaml files (`kubectl apply -f [name of file]`)
4. Find external IP of the node webserver `kubectl get service`
5. use `[externalIp]:7000` to access server