# Docker and VPN IP address conflict resolution

## Problem symptom
The problem was discovered in KFHB deployment of Rubix containers, where we were **unable to SSH to the server as soon as we tried creating a docker network on it**.

For example, the following command would take a long time and end up with a timeout error:
``` 
ssh root@10.5.1.35
``` 

# Steps to identify & resolve the issue

First, list down your current docker networks.

```
$ docker network list

NETWORK ID          NAME                        DRIVER              SCOPE
d06648101dd1        bridge                      bridge              local
cee9f632904a        host                        host                local
e8cebb2f43d1        none                        null                local
874965293c96        root_core_service_network   bridge              local
```

In this example, we are trying to create the network `root_core_service_network` with `bridge` driver. In the list shown above, a default `bridge` network also exists.

We need to check subnets for both networks (`d06648101dd1` and `874965293c96`) and make their subnets different if they are the same. 

With docker network command, we can inspect a network and check its details using this command:
```
$ docker network inspect d06648101dd1

            "Config": [
                {
                    "Subnet": "172.17.0.0/16",
                    "Gateway": "172.17.0.1"
                }
            ]

```

```
$ docker network inspect 874965293c96

            "Config": [
                {
                    "Subnet": "172.17.0.0/16",
                    "Gateway": "172.17.0.1"
                }
            ]

```

**The network conflict is just because of the use of same subnet**. So, we will delete current `root_core_service_network` network and create a new network with custom subnetting using the following command.

```
$ docker network rm 874965293c96

$ docker network create --driver=bridge --subnet=192.168.0.0/16 root_core_service_network
```

Secondly, we can also change `daemon.json` file for docker so that it doesn't allocate IP addresses from a conflicting IP pool. 

Create that file if it doesn't already exist at `/etc/docker/daemon.json` and place the following configuration into it.

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

Now, the above created network can be used in docker-compose file or where its needed, and IP conflicts will be resolved.

# Verify the changes

- Add above created network `root_core_service_network` into any docker-compose file and try to run different docker containers with this network.

- `docker-compose -f docker-compise.yml up` run the containers by this command.

- Open a new terminal and try to SSL server from different terminals by this command `ssh root@10.5.1.35`.

- It must allow all terminals to connect with server via SSH.

# References
* https://www.lullabot.com/articles/fixing-docker-and-vpn-ip-address-conflicts