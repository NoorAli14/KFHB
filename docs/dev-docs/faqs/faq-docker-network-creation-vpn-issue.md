# Docker and VPN IP Address Conflicts Issue

#### 1) We were unable to SSH from loal machines after creating docker network.
we were trying to connect bank linux server using SSH. when we were running 
``` 
ssh root@10.5.1.35
``` 
this command, it was taking so much time and eventually ended up with timesout error.
#### 2) Steps to Identify & Resolve the Issue.

First list down your current docker networks.

```
docker network list
```
```
NETWORK ID          NAME                        DRIVER              SCOPE
d06648101dd1        bridge                      bridge              local
cee9f632904a        host                        host                local
e8cebb2f43d1        none                        null                local
874965293c96        root_core_service_network   bridge              local
```

The network `root_core_service_network` we are trying to create with `bridge` driver. In the list a default `bridge` network also exists.
We need to check subnets for both networks (d06648101dd1,874965293c96) and make their subnets diffrent if these are the same. So we can inspect a network and check it's details using this command:
```
docker network inspect d06648101dd1
```
            "Config": [
                {
                    "Subnet": "172.17.0.0/16",
                    "Gateway": "172.17.0.1"
                }
            ]

```
docker network inspect 874965293c96
```
```
            "Config": [
                {
                    "Subnet": "172.17.0.0/16",
                    "Gateway": "172.17.0.1"
                }
            ]

```

**There is issue just becouse of the same subnet**. So we will delete current `root_core_service_network` network and create a new network with custom subnetting using command bellow.

```
docker network rm 874965293c96
docker network create --driver=bridge --subnet=192.168.0.0/16 root_core_service_network
```
Secondly, we need to change `daemon.json` file also. Create that file if already not exist ``` nano /etc/docker/daemon.json ``` and place these configuration into it.
```
{
  "default-address-pools" : [
    {
      "base" : "172.240.0.0/16",
      "size" : 24
    }
  ]
}
```
Now, the above created network can be used in docker-compose file or where it's needed and IP conflicts will be resolved.

#### 3) Verify the changes.
- Add above created network `root_core_service_network` into any docker-compose file and try to run different docker containers with this network.
- `docker-compose -f docker-compise.yml up ` run the containers by this command.
- Open a new terminal and try to SSL server from different terminals by this command `ssh root@10.5.1.35`.
- It must allow all terminals to connect with server via SSH.
