/**
 * Kubernetes Essentials — Question Bank
 * Single source of truth for both inline section quizzes and the
 * final evaluation. The evaluation samples questions weighted by
 * module exam-weight and difficulty mix; reviewer pages sample the
 * admin-configured number of questions per section.
 *
 * Schema:
 *   window.K8S_QUESTION_BANK = {
 *     m{N}: {
 *       s{M}: [
 *         { id, q, options:[a,b,c,d], correctIndex, explanation, difficulty }
 *       ]
 *     }
 *   }
 *
 * Difficulty: 'easy' | 'medium' | 'hard'
 * IDs are stable strings (k8s-mN-sM-iX) so analytics can track per-question stats later.
 *
 * Module → section map:
 *   m1 Cluster Architecture        s1–s8
 *   m2 Workloads & Scheduling      s1–s8
 *   m3 Services & Networking       s1–s8
 *   m4 Storage                     s1–s4
 *   m5 Troubleshooting             s1–s10
 */
window.K8S_QUESTION_BANK = {

  // ============ MODULE 1: Cluster Architecture (20% weight) ============
  m1: {
    s1: [
      {
        id: 'k8s-m1-s1-i1',
        q: 'How is Kubernetes best described?',
        options: [
          'A container runtime that replaces Docker',
          'A container orchestration platform that automates deployment, scaling, and management of containerized applications',
          'A cloud provider that hosts virtual machines',
          'A programming language for writing microservices'
        ],
        correctIndex: 1,
        explanation: 'Kubernetes is an open-source container orchestration platform — often described as an operating system for your cluster — that automates deployment, scaling, and management of containerized apps.',
        difficulty: 'easy'
      },
      {
        id: 'k8s-m1-s1-i2',
        q: 'Which two high-level parts make up the Kubernetes architecture?',
        options: [
          'Frontend and backend',
          'Control plane (master) and worker nodes',
          'Primary and replica databases',
          'Ingress and egress layers'
        ],
        correctIndex: 1,
        explanation: 'Kubernetes follows a control plane (the brain — scheduling and decisions) plus worker nodes (the muscle — running pods) architecture.',
        difficulty: 'easy'
      },
      {
        id: 'k8s-m1-s1-i3',
        q: 'What is the difference between a cluster and a node?',
        options: [
          'They are the same thing',
          'A cluster is a single machine; a node is a group of machines',
          'A cluster is the control plane plus all worker nodes; a node is a single machine within it',
          'A node contains multiple clusters'
        ],
        correctIndex: 2,
        explanation: 'A common pitfall is confusing the two: a cluster = control plane + all worker nodes, whereas a node = a single machine in the cluster.',
        difficulty: 'medium'
      }
    ],
    s2: [
      {
        id: 'k8s-m1-s2-i1',
        q: 'What is the primary role of the kube-apiserver?',
        options: [
          'It schedules pods onto nodes',
          'It is the central hub of the control plane that exposes the Kubernetes API and is the only component that writes to etcd',
          'It runs containers on worker nodes',
          'It stores all cluster state on disk'
        ],
        correctIndex: 1,
        explanation: 'The API Server is the central hub: it exposes the REST API, authenticates/authorizes requests, validates objects, and is the only component that writes directly to etcd.',
        difficulty: 'easy'
      },
      {
        id: 'k8s-m1-s2-i2',
        q: 'When you run "kubectl get pods", what does the API Server do first?',
        options: [
          'Writes the request to etcd before anything else',
          'Authenticates and authorizes the request, then queries etcd and returns the result',
          'Starts a new pod immediately',
          'Forwards the request directly to the kubelet'
        ],
        correctIndex: 1,
        explanation: 'The API Server authenticates you (kubeconfig), authorizes you (RBAC), queries etcd for the data, and returns the result to kubectl.',
        difficulty: 'medium'
      },
      {
        id: 'k8s-m1-s2-i3',
        q: 'Why should you never write directly to etcd?',
        options: [
          'etcd is read-only',
          'All changes must go through the API Server, which validates, authorizes, and is the single writer to etcd',
          'etcd does not store cluster state',
          'Writing to etcd is faster but insecure'
        ],
        correctIndex: 1,
        explanation: 'Bypassing the API Server skips validation and authorization; the API Server is the only component that should write to etcd.',
        difficulty: 'medium'
      }
    ],
    s3: [
      {
        id: 'k8s-m1-s3-i1',
        q: 'What is etcd in a Kubernetes cluster?',
        options: [
          'A container runtime',
          'A distributed key-value store that holds all cluster data and is the single source of truth',
          'A load balancer for services',
          'A logging agent on each node'
        ],
        correctIndex: 1,
        explanation: 'etcd is a distributed key-value store holding cluster configuration, resource state, secrets, and metadata — the single source of truth.',
        difficulty: 'easy'
      },
      {
        id: 'k8s-m1-s3-i2',
        q: 'Which consensus algorithm does etcd use?',
        options: ['Paxos', 'Raft', 'Gossip', 'Two-phase commit'],
        correctIndex: 1,
        explanation: 'etcd is consistent and highly available, using the Raft consensus algorithm.',
        difficulty: 'medium'
      },
      {
        id: 'k8s-m1-s3-i3',
        q: 'For a highly available etcd, how many nodes should you run?',
        options: [
          'An even number such as 2, 4, or 6',
          'Exactly 1',
          'An odd number such as 3, 5, or 7',
          'As many as possible, with no constraint'
        ],
        correctIndex: 2,
        explanation: 'etcd requires an odd number of nodes for quorum in HA — use 3, 5, or 7 (never 2, 4, or 6).',
        difficulty: 'hard'
      }
    ],
    s4: [
      {
        id: 'k8s-m1-s4-i1',
        q: 'What does the kube-scheduler do?',
        options: [
          'Runs containers on nodes',
          'Watches for newly created pods with no assigned node and selects the best node for them',
          'Stores cluster state',
          'Manages network rules on each node'
        ],
        correctIndex: 1,
        explanation: 'The scheduler watches for unscheduled pods and selects the best node to run each one.',
        difficulty: 'easy'
      },
      {
        id: 'k8s-m1-s4-i2',
        q: 'Which sequence describes the scheduling process?',
        options: [
          'Bind → Score → Filter → Watch',
          'Watch → Filter → Score → Bind',
          'Score → Bind → Watch → Filter',
          'Filter → Bind → Watch → Score'
        ],
        correctIndex: 1,
        explanation: 'The scheduler watches for new unscheduled pods, filters out unsuitable nodes, scores the rest, and binds the pod to the highest-scoring node.',
        difficulty: 'medium'
      },
      {
        id: 'k8s-m1-s4-i3',
        q: 'Which is a filtering criterion the scheduler uses?',
        options: [
          'The pod\u2019s creation timestamp',
          'Whether the node has enough CPU/memory and matches the pod\u2019s nodeSelector and tolerations',
          'The alphabetical name of the node',
          'The number of services in the cluster'
        ],
        correctIndex: 1,
        explanation: 'Filtering removes nodes lacking required resources, volumes, matching labels, or that have taints the pod cannot tolerate.',
        difficulty: 'medium'
      }
    ],
    s5: [
      {
        id: 'k8s-m1-s5-i1',
        q: 'What does the kube-controller-manager do?',
        options: [
          'Runs a single controller that schedules pods',
          'Runs multiple controllers that watch cluster state and drive current state toward desired state',
          'Stores secrets and configmaps',
          'Provides the command-line interface'
        ],
        correctIndex: 1,
        explanation: 'It runs many controllers (Node, Replication, Endpoints, etc.) that reconcile current state toward desired state.',
        difficulty: 'easy'
      },
      {
        id: 'k8s-m1-s5-i2',
        q: 'What are the steps of a controller\u2019s reconciliation loop?',
        options: [
          'Observe → Compare → Act → Repeat',
          'Start → Stop → Delete → Repeat',
          'Schedule → Bind → Watch → Exit',
          'Read → Write → Lock → Unlock'
        ],
        correctIndex: 0,
        explanation: 'Controllers continuously observe current state, compare against desired state, act to reconcile, and repeat.',
        difficulty: 'medium'
      },
      {
        id: 'k8s-m1-s5-i3',
        q: 'Which controller ensures the correct number of pod replicas are running?',
        options: [
          'Node Controller',
          'Replication/ReplicaSet Controller',
          'Service Account Controller',
          'Endpoints Controller'
        ],
        correctIndex: 1,
        explanation: 'The Replication controller ensures the desired number of replicas; the analogy used is cruise control maintaining a set speed.',
        difficulty: 'medium'
      }
    ],
    s6: [
      {
        id: 'k8s-m1-s6-i1',
        q: 'Where does the kubelet run and what is its job?',
        options: [
          'On the control plane; it stores cluster state',
          'On every worker node; it ensures containers are running in pods as specified',
          'On a single master node; it schedules pods',
          'Inside each pod; it routes network traffic'
        ],
        correctIndex: 1,
        explanation: 'The kubelet is an agent on every worker node that ensures containers run as specified and reports status to the API server.',
        difficulty: 'easy'
      },
      {
        id: 'k8s-m1-s6-i2',
        q: 'Which task is a kubelet responsibility?',
        options: [
          'Writing directly to etcd',
          'Pulling container images, starting/stopping containers, and running liveness/readiness probes',
          'Selecting which node a pod runs on',
          'Maintaining iptables rules for services'
        ],
        correctIndex: 1,
        explanation: 'The kubelet registers the node, pulls images, starts/stops containers, performs health checks, and reports status.',
        difficulty: 'medium'
      },
      {
        id: 'k8s-m1-s6-i3',
        q: 'Which command shows node status that the kubelet reports?',
        options: ['kubectl get etcd', 'kubectl get nodes', 'kubectl get scheduler', 'kubectl get proxy'],
        correctIndex: 1,
        explanation: '"kubectl get nodes" shows status reported by each node\u2019s kubelet.',
        difficulty: 'easy'
      }
    ],
    s7: [
      {
        id: 'k8s-m1-s7-i1',
        q: 'What is the role of kube-proxy?',
        options: [
          'It schedules pods to nodes',
          'It maintains network rules on each node so traffic can reach pods, enabling Service load balancing',
          'It stores cluster configuration',
          'It builds container images'
        ],
        correctIndex: 1,
        explanation: 'kube-proxy runs on each node, watches Services/Endpoints, and maintains iptables/ipvs rules to route traffic from Service IPs to Pod IPs.',
        difficulty: 'easy'
      },
      {
        id: 'k8s-m1-s7-i2',
        q: 'Which is the default operating mode of kube-proxy?',
        options: ['userspace mode', 'iptables mode', 'ipvs mode', 'bridge mode'],
        correctIndex: 1,
        explanation: 'iptables mode is the default and most common; it uses Linux iptables with random load balancing.',
        difficulty: 'medium'
      },
      {
        id: 'k8s-m1-s7-i3',
        q: 'When you create a Service, what does kube-proxy do on each node?',
        options: [
          'Nothing — Services are handled only by the API server',
          'Creates/updates network rules mapping the Service ClusterIP to the backing pod IPs',
          'Pulls the container image for the Service',
          'Writes the Service definition to etcd'
        ],
        correctIndex: 1,
        explanation: 'kube-proxy watches for the Service, gets its ClusterIP, and creates rules to load-balance traffic to pod IPs, updating as pods change.',
        difficulty: 'hard'
      }
    ],
    s8: [
      {
        id: 'k8s-m1-s8-i1',
        q: 'What is kubectl?',
        options: [
          'A control plane component that schedules pods',
          'The command-line interface for interacting with Kubernetes clusters',
          'A container runtime',
          'A storage provisioner'
        ],
        correctIndex: 1,
        explanation: 'kubectl (Kube Control) is the CLI for managing applications and resources in a cluster.',
        difficulty: 'easy'
      },
      {
        id: 'k8s-m1-s8-i2',
        q: 'What is the difference between "kubectl run nginx --image=nginx" and "kubectl apply -f deployment.yaml"?',
        options: [
          'They are identical',
          'The first is imperative (create directly); the second is declarative (create/update from a YAML manifest)',
          'The first is declarative; the second is imperative',
          'Only the second can create pods'
        ],
        correctIndex: 1,
        explanation: '"run" is imperative (act directly); "apply -f" is declarative (apply desired state from a manifest).',
        difficulty: 'medium'
      },
      {
        id: 'k8s-m1-s8-i3',
        q: 'On EKS, which command configures kubectl to talk to your cluster?',
        options: [
          'kubectl connect eks',
          'aws eks update-kubeconfig --name my-cluster',
          'kubectl init --eks',
          'eksctl get kubeconfig'
        ],
        correctIndex: 1,
        explanation: 'On EKS you configure kubeconfig with "aws eks update-kubeconfig --name <cluster>".',
        difficulty: 'medium'
      }
    ]
  },

  // ============ MODULE 2: Workloads & Scheduling (20% weight) ============
  m2: {
    s1: [
      {
        id: 'k8s-m2-s1-i1',
        q: 'What is a Pod in Kubernetes?',
        options: [
          'A physical server in the cluster',
          'The smallest deployable unit — a single instance of a running process, holding one or more containers',
          'A network load balancer',
          'A persistent storage volume'
        ],
        correctIndex: 1,
        explanation: 'A Pod is the smallest, simplest unit; it usually holds one container (sometimes more) that share network and storage.',
        difficulty: 'easy'
      },
      {
        id: 'k8s-m2-s1-i2',
        q: 'How do containers within the same pod communicate?',
        options: [
          'Through a LoadBalancer Service',
          'Via localhost, since they share the pod\u2019s network namespace',
          'Only through etcd',
          'They cannot communicate'
        ],
        correctIndex: 1,
        explanation: 'Containers in a pod share the network namespace (localhost) and can share storage volumes; each pod gets one IP.',
        difficulty: 'medium'
      },
      {
        id: 'k8s-m2-s1-i3',
        q: 'Why should you avoid creating bare pods directly in production?',
        options: [
          'Bare pods cost more money',
          'Pods created with "kubectl run" are not recreated if they die — use Deployments, StatefulSets, or DaemonSets',
          'Bare pods cannot have an IP address',
          'Bare pods cannot run containers'
        ],
        correctIndex: 1,
        explanation: 'Bare pods are ephemeral and not self-healing; controllers like Deployments recreate pods that die.',
        difficulty: 'medium'
      }
    ],
    s2: [
      {
        id: 'k8s-m2-s2-i1',
        q: 'Which list correctly names Kubernetes pod phases?',
        options: [
          'Start, Stop, Restart, Delete',
          'Pending, Running, Succeeded, Failed, Unknown',
          'Created, Mounted, Bound, Released',
          'Queued, Active, Idle, Done'
        ],
        correctIndex: 1,
        explanation: 'Pod phases are Pending, Running, Succeeded, Failed, and Unknown.',
        difficulty: 'easy'
      },
      {
        id: 'k8s-m2-s2-i2',
        q: 'What does the Pending phase usually indicate?',
        options: [
          'The pod has failed permanently',
          'The pod is accepted but not yet running — e.g. image is downloading or it is being scheduled',
          'All containers completed successfully',
          'The node has crashed'
        ],
        correctIndex: 1,
        explanation: 'Pending is normal during image download or node selection; it does not always mean a problem.',
        difficulty: 'medium'
      },
      {
        id: 'k8s-m2-s2-i3',
        q: 'During graceful pod termination, what happens after the grace period expires if containers are still running?',
        options: [
          'They keep running indefinitely',
          'SIGKILL is sent to force termination',
          'The pod returns to Running',
          'The node is rebooted'
        ],
        correctIndex: 1,
        explanation: 'On deletion the pod is marked Terminating, SIGTERM is sent, and after the grace period (default 30s) SIGKILL forces shutdown.',
        difficulty: 'hard'
      }
    ],
    s3: [
      {
        id: 'k8s-m2-s3-i1',
        q: 'What does a ReplicaSet ensure?',
        options: [
          'That a specified number of pod replicas are running at any time',
          'That each node runs exactly one pod',
          'That storage is provisioned automatically',
          'That traffic is load balanced externally'
        ],
        correctIndex: 0,
        explanation: 'A ReplicaSet maintains a stable set of replica pods, replacing any that fail or are deleted.',
        difficulty: 'easy'
      },
      {
        id: 'k8s-m2-s3-i2',
        q: 'What is the relationship between Deployments and ReplicaSets?',
        options: [
          'They are unrelated',
          'ReplicaSets are the mechanism Deployments use to manage and scale pods',
          'ReplicaSets manage Deployments',
          'Deployments replace the need for pods'
        ],
        correctIndex: 1,
        explanation: 'A Deployment manages ReplicaSets (and rolling updates); the ReplicaSet is the underlying mechanism keeping replica counts correct.',
        difficulty: 'medium'
      },
      {
        id: 'k8s-m2-s3-i3',
        q: 'In a ReplicaSet spec, what does the "selector.matchLabels" field do?',
        options: [
          'Sets the container image',
          'Identifies which pods the ReplicaSet owns/manages based on their labels',
          'Defines the node to schedule on',
          'Sets the number of replicas'
        ],
        correctIndex: 1,
        explanation: 'The selector matches pod labels so the ReplicaSet knows which pods belong to it; "replicas" sets the count.',
        difficulty: 'medium'
      }
    ],
    s4: [
      {
        id: 'k8s-m2-s4-i1',
        q: 'What does a Deployment provide?',
        options: [
          'Declarative updates for Pods and ReplicaSets',
          'A persistent storage backend',
          'Cluster-wide DNS',
          'Node health monitoring'
        ],
        correctIndex: 0,
        explanation: 'A Deployment provides declarative updates for Pods and ReplicaSets and is the recommended way to manage stateless apps.',
        difficulty: 'easy'
      },
      {
        id: 'k8s-m2-s4-i2',
        q: 'Which command creates a deployment imperatively?',
        options: [
          'kubectl get deployment webapp',
          'kubectl create deployment webapp --image=nginx',
          'kubectl describe deployment webapp',
          'kubectl delete deployment webapp'
        ],
        correctIndex: 1,
        explanation: '"kubectl create deployment <name> --image=<image>" creates a deployment imperatively.',
        difficulty: 'easy'
      },
      {
        id: 'k8s-m2-s4-i3',
        q: 'When a Deployment is deleted, what happens to the ReplicaSets and Pods it manages?',
        options: [
          'They are orphaned and keep running',
          'They are also deleted, because the Deployment owns them',
          'Only the Pods survive',
          'They are converted into DaemonSets'
        ],
        correctIndex: 1,
        explanation: 'Deleting a Deployment cascades to the ReplicaSets and Pods it owns.',
        difficulty: 'medium'
      }
    ],
    s5: [
      {
        id: 'k8s-m2-s5-i1',
        q: 'Which command manually scales a deployment to 5 replicas?',
        options: [
          'kubectl scale deployment webapp --replicas=5',
          'kubectl resize deployment webapp 5',
          'kubectl set replicas webapp=5',
          'kubectl deploy webapp --count 5'
        ],
        correctIndex: 0,
        explanation: '"kubectl scale deployment <name> --replicas=5" sets the replica count.',
        difficulty: 'easy'
      },
      {
        id: 'k8s-m2-s5-i2',
        q: 'What does Horizontal Pod Autoscaling (HPA) do?',
        options: [
          'Increases CPU/RAM of existing pods',
          'Automatically adjusts the number of pod replicas based on metrics like CPU/memory',
          'Adds or removes cluster nodes',
          'Manually sets a fixed replica count'
        ],
        correctIndex: 1,
        explanation: 'HPA automatically scales replica count based on CPU/memory; vertical scaling changes pod resources, cluster autoscaling changes nodes.',
        difficulty: 'medium'
      },
      {
        id: 'k8s-m2-s5-i3',
        q: 'Which scaling type adds or removes whole nodes from the cluster?',
        options: ['Manual scaling', 'Horizontal Pod Autoscaling', 'Vertical scaling', 'Cluster autoscaling'],
        correctIndex: 3,
        explanation: 'Cluster autoscaling adds/removes nodes; HPA changes replica counts; vertical scaling changes pod resources.',
        difficulty: 'medium'
      }
    ],
    s6: [
      {
        id: 'k8s-m2-s6-i1',
        q: 'What does a DaemonSet ensure?',
        options: [
          'A fixed number of total replicas',
          'That all (or some) nodes run a copy of a specific pod',
          'That storage is dynamically provisioned',
          'That a job runs to completion once'
        ],
        correctIndex: 1,
        explanation: 'A DaemonSet ensures every (or selected) node runs a copy of a pod; pods are added/removed as nodes join/leave.',
        difficulty: 'easy'
      },
      {
        id: 'k8s-m2-s6-i2',
        q: 'Which is a typical use case for a DaemonSet?',
        options: [
          'A stateless web frontend',
          'A node-level logging or monitoring agent (e.g. Fluentd, node exporter) on every node',
          'A one-off batch job',
          'A relational database with a single replica'
        ],
        correctIndex: 1,
        explanation: 'DaemonSets suit per-node agents: logging, monitoring, storage daemons, and network plugins.',
        difficulty: 'medium'
      },
      {
        id: 'k8s-m2-s6-i3',
        q: 'When a new node joins the cluster, what does a DaemonSet do?',
        options: [
          'Nothing until manually scaled',
          'Automatically schedules its pod onto the new node',
          'Deletes pods from other nodes',
          'Requires a new Deployment'
        ],
        correctIndex: 1,
        explanation: 'As nodes are added, the DaemonSet automatically adds its pod to them (and garbage-collects on removal).',
        difficulty: 'medium'
      }
    ],
    s7: [
      {
        id: 'k8s-m2-s7-i1',
        q: 'What does setting "nodeName" on a pod do?',
        options: [
          'Adds a label to the node',
          'Assigns the pod directly to a specific named node, bypassing the scheduler',
          'Tells the scheduler to prefer that node',
          'Renames the node'
        ],
        correctIndex: 1,
        explanation: 'nodeName assigns a pod directly to a named node, bypassing the scheduler; if that node is unavailable the pod fails.',
        difficulty: 'medium'
      },
      {
        id: 'k8s-m2-s7-i2',
        q: 'How does "nodeSelector" differ from "nodeName"?',
        options: [
          'nodeSelector bypasses the scheduler; nodeName uses it',
          'nodeSelector is label-based and lets the scheduler pick a matching node; nodeName names one node directly',
          'They are identical',
          'nodeSelector can only target the control plane'
        ],
        correctIndex: 1,
        explanation: 'nodeSelector is label-based and more flexible — the scheduler picks a node whose labels match; nodeName hard-assigns one node.',
        difficulty: 'medium'
      },
      {
        id: 'k8s-m2-s7-i3',
        q: 'With nodeSelector, what happens if no node matches the requested labels?',
        options: [
          'The pod runs on a random node',
          'The pod will not be scheduled (stays Pending)',
          'The scheduler creates a new node',
          'The pod is deleted'
        ],
        correctIndex: 1,
        explanation: 'If no node matches the nodeSelector labels, the pod will not schedule and remains Pending.',
        difficulty: 'hard'
      }
    ],
    s8: [
      {
        id: 'k8s-m2-s8-i1',
        q: 'What does restartPolicy control?',
        options: [
          'How often a node reboots',
          'What Kubernetes does when a container in a pod exits or fails',
          'How many replicas a Deployment keeps',
          'Which node a pod runs on'
        ],
        correctIndex: 1,
        explanation: 'restartPolicy defines the action when a container exits/fails: Always, OnFailure, or Never.',
        difficulty: 'easy'
      },
      {
        id: 'k8s-m2-s8-i2',
        q: 'What is the default restartPolicy for a pod?',
        options: ['Never', 'OnFailure', 'Always', 'IfNeeded'],
        correctIndex: 2,
        explanation: 'Always is the default — the container restarts even after exiting successfully.',
        difficulty: 'easy'
      },
      {
        id: 'k8s-m2-s8-i3',
        q: 'With restartPolicy "OnFailure", when does the container restart?',
        options: [
          'Always, even on success',
          'Only when the container exits with a non-zero (error) exit code',
          'Never',
          'Only when the node restarts'
        ],
        correctIndex: 1,
        explanation: 'OnFailure restarts only on a non-zero exit code; a successful exit (code 0) does not restart.',
        difficulty: 'medium'
      }
    ]
  },

  // ============ MODULE 3: Services & Networking (20% weight) ============
  m3: {
    s1: [
      {
        id: 'k8s-m3-s1-i1',
        q: 'What is a Kubernetes Service?',
        options: [
          'A physical load balancer appliance',
          'An abstraction defining a logical set of Pods and a policy to access them',
          'A storage volume shared between pods',
          'A control plane component'
        ],
        correctIndex: 1,
        explanation: 'A Service abstracts a logical set of pods and a stable policy/endpoint to access them, enabling loose coupling.',
        difficulty: 'easy'
      },
      {
        id: 'k8s-m3-s1-i2',
        q: 'Why are Services needed when pods already have IPs?',
        options: [
          'Pods cannot have IPs without a Service',
          'Pods are ephemeral and get new IPs when recreated; a Service provides a stable endpoint and load balancing',
          'Services replace the need for pods',
          'Services store pod data persistently'
        ],
        correctIndex: 1,
        explanation: 'Because pods are ephemeral with changing IPs, a Service provides a stable IP/DNS and load-balances across matching pods.',
        difficulty: 'medium'
      },
      {
        id: 'k8s-m3-s1-i3',
        q: 'What is the default Service type if none is specified?',
        options: ['NodePort', 'LoadBalancer', 'ClusterIP', 'ExternalName'],
        correctIndex: 2,
        explanation: 'ClusterIP is the default type, exposing the service on an internal cluster IP.',
        difficulty: 'easy'
      }
    ],
    s2: [
      {
        id: 'k8s-m3-s2-i1',
        q: 'Which Service type exposes the service only on an internal cluster IP?',
        options: ['NodePort', 'ClusterIP', 'LoadBalancer', 'ExternalName'],
        correctIndex: 1,
        explanation: 'ClusterIP exposes the service on an internal IP reachable only from within the cluster.',
        difficulty: 'easy'
      },
      {
        id: 'k8s-m3-s2-i2',
        q: 'What does a NodePort Service do?',
        options: [
          'Exposes the service on each node\u2019s IP at a static port (30000\u201332767) for external access',
          'Creates a cloud load balancer automatically',
          'Restricts the service to a single node',
          'Disables external access entirely'
        ],
        correctIndex: 0,
        explanation: 'NodePort exposes the service on every node\u2019s IP at a static port in the 30000\u201332767 range, reachable as <NodeIP>:<NodePort>.',
        difficulty: 'medium'
      },
      {
        id: 'k8s-m3-s2-i3',
        q: 'When would you typically use a LoadBalancer Service?',
        options: [
          'For internal-only microservice communication',
          'To expose a service externally via a cloud provider\u2019s load balancer',
          'To run one pod per node',
          'To store persistent data'
        ],
        correctIndex: 1,
        explanation: 'LoadBalancer provisions an external (cloud) load balancer to expose the service publicly; ClusterIP is internal-only.',
        difficulty: 'medium'
      }
    ],
    s3: [
      {
        id: 'k8s-m3-s3-i1',
        q: 'What does Kubernetes DNS provide?',
        options: [
          'Persistent storage for pods',
          'Automatic DNS records for Services so pods can reach them by name instead of IP',
          'Container image hosting',
          'Node health checks'
        ],
        correctIndex: 1,
        explanation: 'Kubernetes auto-creates DNS records for Services, letting pods use service names instead of IPs, updating as services change.',
        difficulty: 'easy'
      },
      {
        id: 'k8s-m3-s3-i2',
        q: 'What is the FQDN format for a Service?',
        options: [
          '<service>.<node>.local',
          '<service>.<namespace>.svc.cluster.local',
          '<namespace>.<service>.k8s.io',
          '<pod>.<service>.cluster'
        ],
        correctIndex: 1,
        explanation: 'A Service FQDN is <service-name>.<namespace>.svc.cluster.local.',
        difficulty: 'medium'
      },
      {
        id: 'k8s-m3-s3-i3',
        q: 'A pod in the "default" namespace can reach a service named "webapp" in the same namespace using which short name?',
        options: ['webapp.svc', 'webapp', 'default.webapp', 'cluster.local/webapp'],
        correctIndex: 1,
        explanation: 'Within the same namespace a pod can use the short service name (e.g. "webapp"); across namespaces it must qualify with the namespace.',
        difficulty: 'medium'
      }
    ],
    s4: [
      {
        id: 'k8s-m3-s4-i1',
        q: 'How does a Service determine which pods receive its traffic?',
        options: [
          'By pod creation time',
          'By matching pod labels using the Service\u2019s label selector',
          'By the node each pod runs on',
          'By the pod\u2019s restartPolicy'
        ],
        correctIndex: 1,
        explanation: 'Services use label selectors; any pod whose labels match the selector joins the Service and receives load-balanced traffic.',
        difficulty: 'easy'
      },
      {
        id: 'k8s-m3-s4-i2',
        q: 'A Service has selector "app: webapp". Which pod will it route to?',
        options: [
          'Any pod in the cluster',
          'Only pods carrying the label app=webapp',
          'Pods on a node labeled webapp',
          'Pods with the name webapp'
        ],
        correctIndex: 1,
        explanation: 'The selector matches labels, so only pods with label app=webapp are included.',
        difficulty: 'medium'
      },
      {
        id: 'k8s-m3-s4-i3',
        q: 'What is the relationship between pod labels and service selectors?',
        options: [
          'Labels are set on Services; selectors are set on pods',
          'Pods carry labels (key-value pairs); Services define selectors that match those labels',
          'They are the same field',
          'Selectors match pod IP addresses'
        ],
        correctIndex: 1,
        explanation: 'Pods have labels; Services define selectors; matching labels connect pods to the Service.',
        difficulty: 'medium'
      }
    ],
    s5: [
      {
        id: 'k8s-m3-s5-i1',
        q: 'What is a NetworkPolicy?',
        options: [
          'A storage access rule',
          'A resource defining rules that control network traffic between pods, like a firewall',
          'A DNS configuration',
          'A scheduling constraint'
        ],
        correctIndex: 1,
        explanation: 'NetworkPolicy controls ingress/egress traffic between pods using label selectors, acting like a firewall.',
        difficulty: 'easy'
      },
      {
        id: 'k8s-m3-s5-i2',
        q: 'What is the default traffic behavior when no NetworkPolicy exists?',
        options: [
          'All traffic is denied',
          'All traffic is allowed',
          'Only egress is allowed',
          'Only same-namespace traffic is allowed'
        ],
        correctIndex: 1,
        explanation: 'By default (no policies) all traffic is allowed; adding policies begins restricting it.',
        difficulty: 'medium'
      },
      {
        id: 'k8s-m3-s5-i3',
        q: 'What must the cluster have for NetworkPolicy to actually take effect?',
        options: [
          'A LoadBalancer Service',
          'A CNI plugin that supports NetworkPolicy (e.g. Calico, Cilium)',
          'An Ingress controller',
          'A StorageClass'
        ],
        correctIndex: 1,
        explanation: 'NetworkPolicy requires a CNI plugin that supports it (Calico, Cilium, etc.); otherwise policies have no effect.',
        difficulty: 'hard'
      }
    ],
    s6: [
      {
        id: 'k8s-m3-s6-i1',
        q: 'What is Ingress used for?',
        options: [
          'Managing external HTTP/HTTPS access to services, with routing and SSL termination',
          'Provisioning persistent storage',
          'Scheduling pods to nodes',
          'Storing secrets'
        ],
        correctIndex: 0,
        explanation: 'Ingress manages external HTTP/HTTPS access, offering load balancing, SSL termination, and name/path-based routing.',
        difficulty: 'easy'
      },
      {
        id: 'k8s-m3-s6-i2',
        q: 'What is an advantage of Ingress over multiple LoadBalancer Services?',
        options: [
          'It requires no configuration',
          'A single entry point can route to many services (cost-effective) instead of one external IP per service',
          'It provides persistent storage',
          'It eliminates the need for pods'
        ],
        correctIndex: 1,
        explanation: 'LoadBalancer gives one external IP per service (expensive); Ingress provides a single entry point for many services with path/host routing.',
        difficulty: 'medium'
      },
      {
        id: 'k8s-m3-s6-i3',
        q: 'Why does an Ingress resource do nothing on its own?',
        options: [
          'It must be written in JSON, not YAML',
          'It only defines rules; an Ingress Controller (nginx, traefik, AWS ALB, etc.) must be installed to implement them',
          'It needs a StorageClass',
          'It requires a NodePort Service'
        ],
        correctIndex: 1,
        explanation: 'An Ingress resource defines routing rules but needs an Ingress Controller to actually implement them.',
        difficulty: 'hard'
      }
    ],
    s7: [
      {
        id: 'k8s-m3-s7-i1',
        q: 'What are Endpoints in Kubernetes?',
        options: [
          'External URLs for the cluster',
          'Objects that track the IP addresses of pods matching a Service\u2019s selector',
          'DNS servers',
          'Storage mount points'
        ],
        correctIndex: 1,
        explanation: 'Endpoints track the pod IPs (and ports) matching a Service selector — the bridge between Services and Pods.',
        difficulty: 'easy'
      },
      {
        id: 'k8s-m3-s7-i2',
        q: 'If "kubectl get endpoints <service>" returns no addresses, what is the likely cause?',
        options: [
          'The cluster DNS is down',
          'No pods match the Service\u2019s selector (or the matching pods are not ready)',
          'The node is out of storage',
          'The Service type is ClusterIP'
        ],
        correctIndex: 1,
        explanation: 'Empty endpoints usually mean no pods match the selector or they are not ready, so traffic has no backends.',
        difficulty: 'medium'
      },
      {
        id: 'k8s-m3-s7-i3',
        q: 'What are EndpointSlices?',
        options: [
          'A deprecated form of Services',
          'A more scalable replacement for Endpoints that splits endpoint data into smaller pieces',
          'A type of persistent volume',
          'A scheduling policy'
        ],
        correctIndex: 1,
        explanation: 'EndpointSlices are a newer, scalable replacement for Endpoints, splitting endpoint data for large services.',
        difficulty: 'medium'
      }
    ],
    s8: [
      {
        id: 'k8s-m3-s8-i1',
        q: 'Which command tests Service DNS resolution from inside a test pod?',
        options: [
          'kubectl get dns',
          'nslookup webapp-service (or nslookup webapp-service.default.svc.cluster.local)',
          'kubectl describe dns webapp-service',
          'kubectl logs dns'
        ],
        correctIndex: 1,
        explanation: 'From a test pod, "nslookup <service>" (or the FQDN) verifies DNS resolution.',
        difficulty: 'medium'
      },
      {
        id: 'k8s-m3-s8-i2',
        q: 'Which is the correct order of a network diagnostic workflow?',
        options: [
          'Check external access first, then pod-to-pod last',
          'Pod-to-pod connectivity, then service-by-name, then service-to-backends, then external traffic',
          'Only check DNS',
          'Reboot all nodes first'
        ],
        correctIndex: 1,
        explanation: 'Work outward: can pods talk to each other, then reach services by name, then services reach pods, then external traffic reaches the service.',
        difficulty: 'medium'
      },
      {
        id: 'k8s-m3-s8-i3',
        q: 'Which command checks whether a Service has backing pods?',
        options: [
          'kubectl get endpoints <service>',
          'kubectl get nodes',
          'kubectl logs <service>',
          'kubectl top pods'
        ],
        correctIndex: 0,
        explanation: 'Viewing the Service\u2019s endpoints reveals whether any pods back it; empty endpoints indicate a selector/readiness problem.',
        difficulty: 'easy'
      }
    ]
  },

  // ============ MODULE 4: Storage (15% weight) ============
  m4: {
    s1: [
      {
        id: 'k8s-m4-s1-i1',
        q: 'What problem do Volumes solve?',
        options: [
          'They schedule pods to nodes',
          'They provide storage that persists beyond container restarts, since container filesystems are ephemeral',
          'They load-balance network traffic',
          'They authenticate API requests'
        ],
        correctIndex: 1,
        explanation: 'Container filesystems are ephemeral (lost on restart); volumes persist data across restarts and can be shared between containers in a pod.',
        difficulty: 'easy'
      },
      {
        id: 'k8s-m4-s1-i2',
        q: 'What characterizes an emptyDir volume?',
        options: [
          'It persists forever, independent of the pod',
          'It is created when the pod is assigned to a node and deleted when the pod is removed — good for scratch space',
          'It mounts cloud object storage',
          'It is read-only'
        ],
        correctIndex: 1,
        explanation: 'emptyDir is temporary storage tied to the pod\u2019s lifetime on a node — ideal for scratch space.',
        difficulty: 'medium'
      },
      {
        id: 'k8s-m4-s1-i3',
        q: 'What does a hostPath volume mount?',
        options: [
          'A file or directory from the host node\u2019s filesystem',
          'A remote S3 bucket',
          'Another pod\u2019s memory',
          'The etcd database'
        ],
        correctIndex: 0,
        explanation: 'hostPath mounts a file/directory from the host node\u2019s filesystem (use with caution).',
        difficulty: 'medium'
      }
    ],
    s2: [
      {
        id: 'k8s-m4-s2-i1',
        q: 'What is a PersistentVolume (PV)?',
        options: [
          'A request for storage made by a user',
          'A piece of cluster storage provisioned by an admin or dynamically, existing independently of pods',
          'A temporary scratch directory',
          'A network routing rule'
        ],
        correctIndex: 1,
        explanation: 'A PV is a cluster storage resource (like a node) that exists independently of any pod, with its own lifecycle and reclaim policy.',
        difficulty: 'easy'
      },
      {
        id: 'k8s-m4-s2-i2',
        q: 'Is a PersistentVolume namespaced or cluster-scoped?',
        options: [
          'Namespaced',
          'Cluster-scoped',
          'Pod-scoped',
          'Node-scoped'
        ],
        correctIndex: 1,
        explanation: 'A PV is a cluster-scoped resource, unlike a PVC which is namespaced.',
        difficulty: 'medium'
      },
      {
        id: 'k8s-m4-s2-i3',
        q: 'In the storage-unit analogy, what does the PersistentVolume represent?',
        options: [
          'The rental agreement',
          'The actual storage unit, which exists whether rented or not',
          'The person using the storage',
          'The moving truck'
        ],
        correctIndex: 1,
        explanation: 'PV = the storage unit itself (exists independently); PVC = the rental agreement; Pod = the person using it.',
        difficulty: 'easy'
      }
    ],
    s3: [
      {
        id: 'k8s-m4-s3-i1',
        q: 'What is a PersistentVolumeClaim (PVC)?',
        options: [
          'A request for storage by a user that consumes PV resources',
          'A cluster-wide storage device',
          'A scheduling rule',
          'A network policy'
        ],
        correctIndex: 0,
        explanation: 'A PVC is a user\u2019s request for storage; like pods consume node resources, PVCs consume PV resources.',
        difficulty: 'easy'
      },
      {
        id: 'k8s-m4-s3-i2',
        q: 'How does a pod use persistent storage?',
        options: [
          'It mounts the PV directly by name',
          'It references a PVC, which Kubernetes binds to a matching PV',
          'It writes straight to etcd',
          'It uses a Service'
        ],
        correctIndex: 1,
        explanation: 'Pods reference PVCs; Kubernetes binds the PVC to a matching PV (or triggers dynamic provisioning).',
        difficulty: 'medium'
      },
      {
        id: 'k8s-m4-s3-i3',
        q: 'What happens if no existing PV matches a PVC?',
        options: [
          'The PVC is deleted',
          'It can trigger dynamic provisioning (via a StorageClass) to create a matching PV',
          'The pod is scheduled without storage',
          'The cluster restarts'
        ],
        correctIndex: 1,
        explanation: 'If no PV matches, a StorageClass can dynamically provision one to satisfy the claim.',
        difficulty: 'medium'
      }
    ],
    s4: [
      {
        id: 'k8s-m4-s4-i1',
        q: 'What does a StorageClass enable?',
        options: [
          'Manual creation of every PV by an admin',
          'Dynamic provisioning — automatically creating PVs when PVCs are created',
          'Network routing between pods',
          'Pod scheduling by labels'
        ],
        correctIndex: 1,
        explanation: 'A StorageClass describes a class of storage and enables dynamic provisioning, auto-creating PVs as PVCs request them.',
        difficulty: 'easy'
      },
      {
        id: 'k8s-m4-s4-i2',
        q: 'Why are different StorageClasses useful?',
        options: [
          'They let you offer different performance/cost tiers (e.g. fast-ssd vs standard)',
          'They replace the need for PVCs',
          'They control network ingress',
          'They schedule pods to specific nodes'
        ],
        correctIndex: 0,
        explanation: 'StorageClasses define tiers (e.g. "fast-ssd", "standard") so users can request the performance/cost level they need.',
        difficulty: 'medium'
      },
      {
        id: 'k8s-m4-s4-i3',
        q: 'What is a key benefit of dynamic provisioning with StorageClasses?',
        options: [
          'Admins must pre-create every PV manually',
          'It eliminates the need for admins to pre-create PVs — storage is provisioned automatically on demand',
          'It disables PVCs',
          'It forces all storage to be ephemeral'
        ],
        correctIndex: 1,
        explanation: 'Dynamic provisioning removes manual PV pre-creation; storage is created automatically when a PVC requests it.',
        difficulty: 'medium'
      }
    ]
  },

  // ============ MODULE 5: Troubleshooting (25% weight) ============
  m5: {
    s1: [
      {
        id: 'k8s-m5-s1-i1',
        q: 'What is the recommended first step in the systematic troubleshooting workflow?',
        options: [
          'Reboot all nodes',
          'Identify the problem \u2014 determine what is not working',
          'Delete the pod',
          'Reinstall Kubernetes'
        ],
        correctIndex: 1,
        explanation: 'The 5-step process starts with identifying the problem, then checking pod status, logs, describe/events, and connectivity.',
        difficulty: 'easy'
      },
      {
        id: 'k8s-m5-s1-i2',
        q: 'For a pod stuck in Pending, what does the quick diagnostic chart say to check?',
        options: [
          'Application logs only',
          'Events, node resources, and scheduling issues',
          'The Service selector',
          'The container image tag'
        ],
        correctIndex: 1,
        explanation: 'For Pending pods, check events, node resources, and scheduling issues.',
        difficulty: 'medium'
      },
      {
        id: 'k8s-m5-s1-i3',
        q: 'Which set of commands are the essential four for almost every issue?',
        options: [
          'get pods, logs, describe pod, exec',
          'apply, delete, scale, rollout',
          'label, annotate, taint, cordon',
          'top, drain, uncordon, edit'
        ],
        correctIndex: 0,
        explanation: 'The essentials: kubectl get pods (status), logs (read logs), describe pod (events), exec (interactive debugging).',
        difficulty: 'medium'
      }
    ],
    s2: [
      {
        id: 'k8s-m5-s2-i1',
        q: 'What does "kubectl logs" show?',
        options: [
          'The cluster event history',
          'The stdout/stderr output from containers',
          'The node\u2019s system journal',
          'The etcd contents'
        ],
        correctIndex: 1,
        explanation: 'kubectl logs shows container stdout/stderr — errors, warnings, stack traces, and custom logging.',
        difficulty: 'easy'
      },
      {
        id: 'k8s-m5-s2-i2',
        q: 'Which flag shows logs from the previous container instance after a crash?',
        options: ['--follow', '--previous', '--tail=100', '--since=1h'],
        correctIndex: 1,
        explanation: 'kubectl logs <pod> --previous shows logs from the prior (crashed) container instance.',
        difficulty: 'medium'
      },
      {
        id: 'k8s-m5-s2-i3',
        q: 'Which flag follows a pod\u2019s logs in real time (like tail -f)?',
        options: ['-f', '--previous', '--timestamps', '--tail'],
        correctIndex: 0,
        explanation: 'kubectl logs -f <pod> streams logs in real time.',
        difficulty: 'easy'
      }
    ],
    s3: [
      {
        id: 'k8s-m5-s3-i1',
        q: 'What is the most useful part of "kubectl describe pod" output for troubleshooting?',
        options: [
          'The image pull secrets',
          'The Events section at the bottom, showing what Kubernetes tried to do',
          'The resource limits',
          'The pod IP'
        ],
        correctIndex: 1,
        explanation: 'describe shows metadata, status, and crucially the Events at the bottom, which reveal what Kubernetes attempted and why it failed.',
        difficulty: 'easy'
      },
      {
        id: 'k8s-m5-s3-i2',
        q: 'Besides pods, what else can "kubectl describe" inspect?',
        options: [
          'Only pods',
          'Nodes, services, deployments, and other resources',
          'Only the control plane',
          'Only namespaces'
        ],
        correctIndex: 1,
        explanation: 'describe works on many resources: pods, nodes, services, deployments, etc.',
        difficulty: 'medium'
      },
      {
        id: 'k8s-m5-s3-i3',
        q: 'Why are Events shown by describe so important?',
        options: [
          'They show billing information',
          'They are time-ordered records of what Kubernetes did, helping pinpoint scheduling, image, or mount failures',
          'They list all cluster users',
          'They display the pod\u2019s source code'
        ],
        correctIndex: 1,
        explanation: 'Events explain the sequence of actions Kubernetes took (scheduling, pulling, mounting), making the root cause visible.',
        difficulty: 'medium'
      }
    ],
    s4: [
      {
        id: 'k8s-m5-s4-i1',
        q: 'What does "kubectl exec" do?',
        options: [
          'Deletes a container',
          'Executes commands inside a running container for debugging from within',
          'Exports pod logs',
          'Schedules a new pod'
        ],
        correctIndex: 1,
        explanation: 'kubectl exec runs commands inside a running container — useful to debug from inside the container.',
        difficulty: 'easy'
      },
      {
        id: 'k8s-m5-s4-i2',
        q: 'Which command opens an interactive shell inside a pod?',
        options: [
          'kubectl exec -it my-pod -- /bin/bash',
          'kubectl shell my-pod',
          'kubectl logs -it my-pod',
          'kubectl run my-pod -- bash'
        ],
        correctIndex: 0,
        explanation: 'kubectl exec -it <pod> -- /bin/bash (or sh) opens an interactive shell.',
        difficulty: 'medium'
      },
      {
        id: 'k8s-m5-s4-i3',
        q: 'For a multi-container pod, how do you exec into a specific container?',
        options: [
          'You cannot target a specific container',
          'Use the -c <container-name> flag',
          'Use --previous',
          'Use --all-containers'
        ],
        correctIndex: 1,
        explanation: 'Use -c <container-name> to target a specific container in a multi-container pod.',
        difficulty: 'medium'
      }
    ],
    s5: [
      {
        id: 'k8s-m5-s5-i1',
        q: 'What are cluster Events?',
        options: [
          'Scheduled cron jobs',
          'Time-ordered records of what happened in the cluster',
          'Container log files',
          'Network packets'
        ],
        correctIndex: 1,
        explanation: 'Events are time-ordered records of cluster actions, invaluable for understanding the sequence of what happened.',
        difficulty: 'easy'
      },
      {
        id: 'k8s-m5-s5-i2',
        q: 'How long are Events retained by default?',
        options: ['Forever', 'About 1 hour', '24 hours', '7 days'],
        correctIndex: 1,
        explanation: 'Events are automatically deleted after about 1 hour by default; use a logging solution for long-term tracking.',
        difficulty: 'medium'
      },
      {
        id: 'k8s-m5-s5-i3',
        q: 'Which command sorts events by time?',
        options: [
          "kubectl get events --sort-by='.lastTimestamp'",
          'kubectl get events --oldest',
          'kubectl logs events --time',
          'kubectl describe events --sorted'
        ],
        correctIndex: 0,
        explanation: "kubectl get events --sort-by='.lastTimestamp' orders events chronologically.",
        difficulty: 'medium'
      }
    ],
    s6: [
      {
        id: 'k8s-m5-s6-i1',
        q: 'What does CrashLoopBackOff mean?',
        options: [
          'The image cannot be pulled',
          'The container keeps crashing and Kubernetes keeps restarting it with exponential backoff',
          'The pod cannot be scheduled',
          'The node is unhealthy'
        ],
        correctIndex: 1,
        explanation: 'CrashLoopBackOff means the container repeatedly crashes and is restarted with increasing backoff delays.',
        difficulty: 'easy'
      },
      {
        id: 'k8s-m5-s6-i2',
        q: 'Which is a common cause of CrashLoopBackOff?',
        options: [
          'The Service selector is wrong',
          'The application crashes on startup due to missing env vars/config, a wrong command, or unready dependencies',
          'The node is out of disk',
          'The image tag does not exist'
        ],
        correctIndex: 1,
        explanation: 'Common causes include immediate startup crashes, missing config/env vars, wrong entrypoint/command, or dependencies not ready.',
        difficulty: 'medium'
      },
      {
        id: 'k8s-m5-s6-i3',
        q: 'When debugging CrashLoopBackOff, which command reveals why the previous run crashed?',
        options: [
          'kubectl logs my-pod --previous',
          'kubectl get nodes',
          'kubectl top pod my-pod',
          'kubectl scale'
        ],
        correctIndex: 0,
        explanation: 'kubectl logs <pod> --previous shows output from the crashed instance, revealing the failure.',
        difficulty: 'medium'
      }
    ],
    s7: [
      {
        id: 'k8s-m5-s7-i1',
        q: 'What does ImagePullBackOff indicate?',
        options: [
          'The container crashed after starting',
          'Kubernetes cannot pull the container image from the registry',
          'The pod cannot be scheduled to a node',
          'The node lost network connectivity to etcd'
        ],
        correctIndex: 1,
        explanation: 'ImagePullBackOff means the image could not be pulled from the registry.',
        difficulty: 'easy'
      },
      {
        id: 'k8s-m5-s7-i2',
        q: 'Which is a common cause of ImagePullBackOff?',
        options: [
          'Too many replicas',
          'A wrong image name/tag, a missing image, or a private registry needing credentials',
          'A NetworkPolicy blocking egress',
          'An unbound PVC'
        ],
        correctIndex: 1,
        explanation: 'Causes include incorrect image name/tag, nonexistent image, missing registry credentials, or network issues reaching the registry.',
        difficulty: 'medium'
      },
      {
        id: 'k8s-m5-s7-i3',
        q: 'For a private registry causing ImagePullBackOff, what is the fix?',
        options: [
          'Increase replica count',
          'Add imagePullSecrets so the pod can authenticate to the registry',
          'Add a NetworkPolicy',
          'Change the restartPolicy'
        ],
        correctIndex: 1,
        explanation: 'For private registries, add imagePullSecrets so Kubernetes can authenticate and pull the image.',
        difficulty: 'hard'
      }
    ],
    s8: [
      {
        id: 'k8s-m5-s8-i1',
        q: 'What does a pod in the Pending state mean?',
        options: [
          'The container crashed',
          'The scheduler cannot find a suitable node to run it',
          'The image cannot be pulled',
          'The pod completed successfully'
        ],
        correctIndex: 1,
        explanation: 'Pending means the scheduler cannot place the pod on a suitable node.',
        difficulty: 'easy'
      },
      {
        id: 'k8s-m5-s8-i2',
        q: 'Which is a common reason a pod stays Pending?',
        options: [
          'The application logs an error',
          'Insufficient CPU/memory, a nodeSelector that matches no node, taints, or an unbound PVC',
          'The container exits with code 0',
          'The Service has no DNS record'
        ],
        correctIndex: 1,
        explanation: 'Pending causes include insufficient resources, unmatched node selectors, taints, unbound PVCs, or no available nodes.',
        difficulty: 'medium'
      },
      {
        id: 'k8s-m5-s8-i3',
        q: 'Which commands help diagnose a Pending pod\u2019s node resources?',
        options: [
          'kubectl describe pod <pod> and kubectl describe nodes / kubectl top nodes',
          'kubectl logs <pod> --previous',
          'kubectl exec -it <pod>',
          'kubectl rollout status'
        ],
        correctIndex: 0,
        explanation: 'describe pod shows the scheduling event message; describe nodes / top nodes reveal available resources.',
        difficulty: 'medium'
      }
    ],
    s9: [
      {
        id: 'k8s-m5-s9-i1',
        q: 'Which command checks node health?',
        options: [
          'kubectl get nodes (STATUS should be Ready)',
          'kubectl logs nodes',
          'kubectl exec nodes',
          'kubectl top events'
        ],
        correctIndex: 0,
        explanation: 'kubectl get nodes shows status; Ready is healthy, while NotReady or Unknown indicates a problem.',
        difficulty: 'easy'
      },
      {
        id: 'k8s-m5-s9-i2',
        q: 'A node showing "NotReady" most likely means what?',
        options: [
          'The node is healthy and idle',
          'There is a problem with the node (e.g. kubelet, network, or resources) needing investigation',
          'The node has no pods scheduled',
          'The node is the control plane'
        ],
        correctIndex: 1,
        explanation: 'NotReady (or Unknown) signals a node problem; describe the node and check conditions to investigate.',
        difficulty: 'medium'
      },
      {
        id: 'k8s-m5-s9-i3',
        q: 'Why can an unhealthy node cause widespread failures?',
        options: [
          'It deletes the cluster',
          'Pods scheduled on it can fail together, affecting many workloads at once',
          'It changes the Service selectors',
          'It reformats etcd'
        ],
        correctIndex: 1,
        explanation: 'An unhealthy node can cause all the pods it hosts to fail, leading to widespread impact.',
        difficulty: 'medium'
      }
    ],
    s10: [
      {
        id: 'k8s-m5-s10-i1',
        q: 'According to the troubleshooting checklist, what is the first command to run when debugging?',
        options: [
          'kubectl delete pod',
          'kubectl get pods (check status)',
          'kubectl drain node',
          'kubectl apply -f'
        ],
        correctIndex: 1,
        explanation: 'Step 1 of the checklist is to check pod status with kubectl get pods.',
        difficulty: 'easy'
      },
      {
        id: 'k8s-m5-s10-i2',
        q: 'Which sequence reflects the checklist\u2019s debugging order?',
        options: [
          'Status \u2192 Logs \u2192 Events \u2192 Resources \u2192 Networking \u2192 Configuration',
          'Configuration \u2192 Networking \u2192 Logs \u2192 Status',
          'Networking \u2192 Status \u2192 Resources',
          'Logs \u2192 Status \u2192 Delete'
        ],
        correctIndex: 0,
        explanation: 'The checklist proceeds: check pod status, logs, events, node resources, networking/endpoints, then configuration.',
        difficulty: 'medium'
      },
      {
        id: 'k8s-m5-s10-i3',
        q: 'Under "Check Configuration," which items does the checklist call out?',
        options: [
          'Replica count and node labels',
          'Environment variables set correctly, ConfigMaps/Secrets mounted, and volume mounts working',
          'Service type and Ingress class',
          'etcd quorum and Raft leader'
        ],
        correctIndex: 1,
        explanation: 'Configuration checks include correct env vars, mounted ConfigMaps/Secrets, and working volume mounts.',
        difficulty: 'medium'
      }
    ]
  }

};
// =========================================================================
//  SCENARIO QUESTION BANK  (appended 2026-06-16)
//  Scenario-based questions for the final evaluation ONLY (not used in
//  inline module section quizzes). Same schema as K8S_QUESTION_BANK plus
//  type:'scenario'. The evaluation merges these into the sampling pool and
//  reserves 10-12 scenario slots per attempt.
//
//  Schema: { id, q, options:[..], correctIndex, explanation, difficulty,
//            type:'scenario', module:'mN', section:'sM' }
//
//  Distribution by module exam-weight:
//    m1 .20 -> 6 | m2 .20 -> 6 | m3 .20 -> 6 | m4 .15 -> 4 | m5 .25 -> 8
//  Total: 30
// =========================================================================
window.K8S_SCENARIO_BANK = [

  // ---------------- MODULE 1: Cluster Architecture (6) ----------------
  {
    id: 'k8s-scn-m1-1', module: 'm1', section: 's2', type: 'scenario',
    q: 'A developer reports that every kubectl command suddenly fails with "Unable to connect to the server." Pods that were already running continue to serve traffic normally. Which control-plane component is the most likely culprit?',
    options: [
      'kubelet on the worker nodes',
      'The API Server',
      'kube-proxy',
      'The container runtime'
    ],
    correctIndex: 1,
    explanation: 'kubectl talks only to the API Server. Running pods keep serving because the data plane is independent of the control plane, but no new API requests can be processed if the API Server is down.',
    difficulty: 'medium'
  },
  {
    id: 'k8s-scn-m1-2', module: 'm1', section: 's3', type: 'scenario',
    q: 'After a power event, two of your three etcd members are permanently lost and unrecoverable. The cluster API becomes read-only and rejects writes. What is the root cause?',
    options: [
      'kube-scheduler crashed',
      'etcd lost quorum, since a 3-member cluster needs at least 2 healthy members',
      'kube-proxy rules were flushed',
      'The container runtime stopped'
    ],
    correctIndex: 1,
    explanation: 'etcd uses Raft consensus and needs a majority (quorum). With only 1 of 3 members healthy, quorum is lost and the cluster cannot commit writes.',
    difficulty: 'hard'
  },
  {
    id: 'k8s-scn-m1-3', module: 'm1', section: 's4', type: 'scenario',
    q: 'You create a pod and it stays Pending. Events show "0/3 nodes are available: 3 Insufficient memory." Which component made this decision, and why is the pod Pending?',
    options: [
      'kubelet rejected it because the image was too large',
      'The kube-scheduler could not find a node that passes the filtering stage due to insufficient resources',
      'kube-proxy blocked the pod network',
      'etcd refused to store the pod'
    ],
    correctIndex: 1,
    explanation: 'The scheduler filters out nodes lacking required resources. If no node survives filtering, the pod has no node assigned and remains Pending.',
    difficulty: 'medium'
  },
  {
    id: 'k8s-scn-m1-4', module: 'm1', section: 's5', type: 'scenario',
    q: 'You delete a pod that belongs to a Deployment with 3 replicas. Within seconds a new pod appears to replace it. Which mechanism is responsible?',
    options: [
      'The kube-scheduler recreated it',
      'The controller-manager reconciliation loop detected current (2) != desired (3) and created a replacement',
      'kubelet cloned the pod',
      'The API Server duplicated the request'
    ],
    correctIndex: 1,
    explanation: 'Controllers continuously reconcile observed state toward desired state. The ReplicaSet controller noticed the replica count dropped and created a new pod.',
    difficulty: 'medium'
  },
  {
    id: 'k8s-scn-m1-5', module: 'm1', section: 's6', type: 'scenario',
    q: 'A single worker node shows status NotReady, and only the pods on that node are affected. Other nodes are fine. Which on-node component failing best explains a node going NotReady?',
    options: [
      'The API Server',
      'etcd',
      'The kubelet on that node stopped reporting status',
      'The kube-controller-manager'
    ],
    correctIndex: 2,
    explanation: 'The kubelet registers the node and reports its status. If the kubelet stops, the node is marked NotReady while the rest of the cluster is unaffected.',
    difficulty: 'medium'
  },
  {
    id: 'k8s-scn-m1-6', module: 'm1', section: 's7', type: 'scenario',
    q: 'Traffic to a ClusterIP Service intermittently fails to reach healthy backend pods on one specific node, while the same Service works from other nodes. Which node-level component most likely has stale or broken rules?',
    options: [
      'kube-scheduler',
      'kube-proxy on that node',
      'etcd',
      'The Deployment controller'
    ],
    correctIndex: 1,
    explanation: 'kube-proxy maintains the per-node iptables/ipvs rules that route Service IPs to pod IPs. Broken rules on one node cause node-local Service routing failures.',
    difficulty: 'hard'
  },

  // ---------------- MODULE 2: Workloads & Scheduling (6) ----------------
  {
    id: 'k8s-scn-m2-1', module: 'm2', section: 's1', type: 'scenario',
    q: 'A teammate runs "kubectl run web --image=nginx" in production. A node is drained for maintenance and the pod disappears, never coming back. What should they have used instead?',
    options: [
      'A bare pod is correct; the node should not have been drained',
      'A Deployment, so a controller recreates the pod on another node',
      'A NetworkPolicy',
      'A PersistentVolume'
    ],
    correctIndex: 1,
    explanation: 'Bare pods are not rescheduled when their node goes away. A Deployment (via its ReplicaSet) maintains the desired replica count and recreates pods on healthy nodes.',
    difficulty: 'medium'
  },
  {
    id: 'k8s-scn-m2-2', module: 'm2', section: 's2', type: 'scenario',
    q: 'A pod has been in Pending for several minutes. describe shows it is still pulling a large image. Is this necessarily a problem?',
    options: [
      'Yes, Pending always indicates a failure',
      'No, Pending is normal during image download and scheduling; investigate only if it persists abnormally',
      'Yes, the pod should be deleted immediately',
      'No, but only if restartPolicy is Never'
    ],
    correctIndex: 1,
    explanation: 'Pending is an expected transient phase while the image downloads or a node is selected. It is only a concern if it persists without progress.',
    difficulty: 'easy'
  },
  {
    id: 'k8s-scn-m2-3', module: 'm2', section: 's3', type: 'scenario',
    q: 'You apply a ReplicaSet with replicas: 3 and selector app=web, but it reports 0 ready pods even though 3 pods labelled app=web already exist and are Running. What is the most likely cause?',
    options: [
      'The pods are on the wrong node',
      'The ReplicaSet selector does not actually match the pods\u2019 labels',
      'ReplicaSets cannot manage pre-existing pods ever',
      'The cluster is out of memory'
    ],
    correctIndex: 1,
    explanation: 'A ReplicaSet only manages pods whose labels match its selector. A label/selector mismatch means it sees none of them and would create its own.',
    difficulty: 'medium'
  },
  {
    id: 'k8s-scn-m2-4', module: 'm2', section: 's5', type: 'scenario',
    q: 'An HPA is configured on a Deployment. An engineer also runs "kubectl scale deployment web --replicas=10" manually. Replica count then keeps fluctuating unexpectedly. Why?',
    options: [
      'The cluster autoscaler is broken',
      'Manual scaling conflicts with the HPA, which keeps adjusting replicas based on metrics',
      'The Deployment is corrupted',
      'NodePort is interfering'
    ],
    correctIndex: 1,
    explanation: 'When HPA is enabled, it owns the replica count. Manual scaling fights the HPA, producing oscillation as both try to set replicas.',
    difficulty: 'medium'
  },
  {
    id: 'k8s-scn-m2-5', module: 'm2', section: 's6', type: 'scenario',
    q: 'You need a log-collection agent running on every node, including any new nodes added later, with exactly one copy per node. Which workload type fits?',
    options: [
      'A Deployment with replicas equal to the node count',
      'A DaemonSet',
      'A single bare pod',
      'A StatefulSet'
    ],
    correctIndex: 1,
    explanation: 'A DaemonSet ensures one pod per node and automatically adds pods to new nodes, which is ideal for node-level agents like log collectors.',
    difficulty: 'easy'
  },
  {
    id: 'k8s-scn-m2-6', module: 'm2', section: 's8', type: 'scenario',
    q: 'A batch job pod runs a script that should retry only when it fails, and stop permanently once it succeeds. Which restartPolicy is correct?',
    options: [
      'Always',
      'OnFailure',
      'Never',
      'Default'
    ],
    correctIndex: 1,
    explanation: 'OnFailure restarts the container only on a non-zero exit code and does not restart after a successful (exit 0) completion, matching retry-on-failure semantics.',
    difficulty: 'medium'
  },

  // ---------------- MODULE 3: Services & Networking (6) ----------------
  {
    id: 'k8s-scn-m3-1', module: 'm3', section: 's2', type: 'scenario',
    q: 'An internal microservice should be reachable only by other pods inside the cluster, never from outside. Which Service type should you choose?',
    options: [
      'NodePort',
      'LoadBalancer',
      'ClusterIP',
      'ExternalName pointing to a public host'
    ],
    correctIndex: 2,
    explanation: 'ClusterIP exposes the service on an internal cluster IP only, which is exactly right for internal-only microservices.',
    difficulty: 'easy'
  },
  {
    id: 'k8s-scn-m3-2', module: 'm3', section: 's2', type: 'scenario',
    q: 'You expose 6 different production web apps externally. Using a LoadBalancer Service per app is becoming expensive in cloud charges. What is the more cost-effective approach for HTTP routing?',
    options: [
      'Switch them all to NodePort',
      'Use a single Ingress with host/path rules in front of ClusterIP Services',
      'Use one LoadBalancer and share its IP manually',
      'Move them to DaemonSets'
    ],
    correctIndex: 1,
    explanation: 'Ingress provides a single entry point that routes by host/path to multiple backend Services, avoiding one cloud load balancer (and bill) per app.',
    difficulty: 'medium'
  },
  {
    id: 'k8s-scn-m3-3', module: 'm3', section: 's3', type: 'scenario',
    q: 'A pod in namespace "default" needs to reach service "db" in namespace "prod". Using "curl http://db" fails, but the full name works. What is the correct FQDN?',
    options: [
      'db.default.svc.cluster.local',
      'db.prod.svc.cluster.local',
      'prod.db.cluster.local',
      'db.cluster.local.prod'
    ],
    correctIndex: 1,
    explanation: 'Cross-namespace access requires the FQDN service-name.namespace.svc.cluster.local. The short name resolves within the caller\u2019s own namespace only.',
    difficulty: 'medium'
  },
  {
    id: 'k8s-scn-m3-4', module: 'm3', section: 's4', type: 'scenario',
    q: 'A Service has 0 endpoints even though several pods are Running. "kubectl get pods --show-labels" reveals the pods are labelled app=webapp but the Service selector is app=web-app. What fixes it?',
    options: [
      'Restart the API Server',
      'Align the Service selector with the pods\u2019 actual labels (or relabel the pods)',
      'Change the Service to NodePort',
      'Recreate etcd'
    ],
    correctIndex: 1,
    explanation: 'Services select pods by exact label match. A mismatch (web-app vs webapp) yields zero endpoints; aligning selector and labels restores routing.',
    difficulty: 'medium'
  },
  {
    id: 'k8s-scn-m3-5', module: 'm3', section: 's5', type: 'scenario',
    q: 'Security requires that only "frontend" pods may reach "database" pods on port 5432, and all other traffic to the database is denied. Which resource enforces this?',
    options: [
      'A LoadBalancer Service',
      'A NetworkPolicy selecting the database pods that allows ingress only from frontend on port 5432',
      'An Ingress resource',
      'A nodeSelector'
    ],
    correctIndex: 1,
    explanation: 'A NetworkPolicy with a podSelector for the database and an ingress rule limited to frontend on 5432 enforces pod-to-pod traffic control (requires a supporting CNI).',
    difficulty: 'hard'
  },
  {
    id: 'k8s-scn-m3-6', module: 'm3', section: 's8', type: 'scenario',
    q: 'A Service is unreachable. You confirm endpoints exist and pods are Running, but DNS lookups for the service name fail from a test pod. Which cluster component should you check next?',
    options: [
      'etcd disk usage',
      'CoreDNS pods in kube-system',
      'The kube-scheduler logs',
      'The container runtime version'
    ],
    correctIndex: 1,
    explanation: 'In-cluster DNS resolution is handled by CoreDNS. If endpoints are healthy but name resolution fails, CoreDNS health is the logical next check.',
    difficulty: 'hard'
  },

  // ---------------- MODULE 4: Storage (4) ----------------
  {
    id: 'k8s-scn-m4-1', module: 'm4', section: 's1', type: 'scenario',
    q: 'A container writes important data to its own filesystem. After a crash and restart, the data is gone. What should have been used to preserve it across restarts?',
    options: [
      'A larger container image',
      'A Volume mounted into the container',
      'A NodePort Service',
      'A higher restart count'
    ],
    correctIndex: 1,
    explanation: 'Container filesystems are ephemeral. A Volume persists data across container restarts within the pod, unlike the container\u2019s own writable layer.',
    difficulty: 'easy'
  },
  {
    id: 'k8s-scn-m4-2', module: 'm4', section: 's2', type: 'scenario',
    q: 'You need block storage that can be mounted read-write by exactly one node at a time (typical for AWS EBS). Which access mode must the PersistentVolume use?',
    options: [
      'ReadWriteMany (RWX)',
      'ReadOnlyMany (ROX)',
      'ReadWriteOnce (RWO)',
      'WriteOnce'
    ],
    correctIndex: 2,
    explanation: 'ReadWriteOnce permits read-write mounting by a single node, which matches typical cloud block volumes such as AWS EBS.',
    difficulty: 'medium'
  },
  {
    id: 'k8s-scn-m4-3', module: 'm4', section: 's3', type: 'scenario',
    q: 'A pod stays Pending with the event "pod has unbound immediate PersistentVolumeClaims." A 5Gi PVC exists but no matching PV. What is the most likely fix in a dynamic-provisioning cluster?',
    options: [
      'Delete the PVC and run the pod without storage',
      'Ensure the PVC references a StorageClass so a PV is dynamically provisioned',
      'Increase the pod CPU request',
      'Switch the Service to LoadBalancer'
    ],
    correctIndex: 1,
    explanation: 'If no static PV matches, binding requires dynamic provisioning via a StorageClass. Without one, the PVC stays unbound and the pod stays Pending.',
    difficulty: 'hard'
  },
  {
    id: 'k8s-scn-m4-4', module: 'm4', section: 's4', type: 'scenario',
    q: 'Your team wants storage created automatically whenever a PVC is submitted, with different performance tiers (fast SSD vs standard). Which mechanism provides this?',
    options: [
      'Pre-creating every PV manually',
      'StorageClasses with dynamic provisioning',
      'hostPath volumes on each node',
      'emptyDir volumes'
    ],
    correctIndex: 1,
    explanation: 'StorageClasses describe storage tiers and enable dynamic provisioning, so a matching PV is created automatically when a PVC referencing the class is submitted.',
    difficulty: 'medium'
  },

  // ---------------- MODULE 5: Troubleshooting (8) ----------------
  {
    id: 'k8s-scn-m5-1', module: 'm5', section: 's1', type: 'scenario',
    q: 'A pod shows STATUS CrashLoopBackOff. Following the systematic workflow, which command gives the most direct insight into why the container keeps dying?',
    options: [
      'kubectl get nodes',
      'kubectl logs <pod> --previous',
      'kubectl scale deployment',
      'kubectl top nodes'
    ],
    correctIndex: 1,
    explanation: 'For a crashing container, the logs of the previous (crashed) instance usually reveal the startup error, making --previous the key diagnostic.',
    difficulty: 'medium'
  },
  {
    id: 'k8s-scn-m5-2', module: 'm5', section: 's2', type: 'scenario',
    q: 'You want to watch a misbehaving pod\u2019s log output live as you reproduce a bug. Which kubectl logs option do you use?',
    options: [
      '--tail=10',
      '--since=24h',
      '-f (follow)',
      '--timestamps only'
    ],
    correctIndex: 2,
    explanation: 'The -f/--follow flag streams logs in real time, similar to tail -f, which is ideal for observing live behaviour during reproduction.',
    difficulty: 'easy'
  },
  {
    id: 'k8s-scn-m5-3', module: 'm5', section: 's3', type: 'scenario',
    q: 'A pod will not start and you suspect a scheduling or image problem. Which single command shows the Events that reveal what Kubernetes tried and failed to do?',
    options: [
      'kubectl logs <pod>',
      'kubectl describe pod <pod>',
      'kubectl get pods -o wide',
      'kubectl exec -it <pod> -- sh'
    ],
    correctIndex: 1,
    explanation: 'kubectl describe shows the Events section at the bottom, which records scheduling, image-pull, and container lifecycle failures.',
    difficulty: 'easy'
  },
  {
    id: 'k8s-scn-m5-4', module: 'm5', section: 's6', type: 'scenario',
    q: 'A container enters CrashLoopBackOff immediately on startup. Logs show "missing required environment variable DB_HOST." What is the appropriate fix?',
    options: [
      'Increase the node memory',
      'Add the required environment variable (or its ConfigMap/Secret) to the pod spec',
      'Change the Service type',
      'Add more replicas'
    ],
    correctIndex: 1,
    explanation: 'The crash is a configuration issue. Supplying the missing env var (directly or via ConfigMap/Secret) lets the app start normally.',
    difficulty: 'medium'
  },
  {
    id: 'k8s-scn-m5-5', module: 'm5', section: 's7', type: 'scenario',
    q: 'A pod is stuck in ImagePullBackOff. describe shows "manifest unknown." What does this most likely indicate?',
    options: [
      'The node is out of CPU',
      'The image name or tag is wrong / does not exist in the registry',
      'A NetworkPolicy is blocking the pod',
      'The PVC is unbound'
    ],
    correctIndex: 1,
    explanation: '"manifest unknown" means the registry has no image matching that name/tag, typically a typo or a non-existent tag.',
    difficulty: 'medium'
  },
  {
    id: 'k8s-scn-m5-6', module: 'm5', section: 's7', type: 'scenario',
    q: 'Pods pulling from a private registry fail with ImagePullBackOff and "authentication required." What is the correct remedy?',
    options: [
      'Use a public image only',
      'Add imagePullSecrets referencing valid registry credentials',
      'Increase the pod restart limit',
      'Switch restartPolicy to Never'
    ],
    correctIndex: 1,
    explanation: 'Private registries need credentials. Configuring imagePullSecrets (and referencing them in the pod/service account) authenticates the pull.',
    difficulty: 'hard'
  },
  {
    id: 'k8s-scn-m5-7', module: 'm5', section: 's8', type: 'scenario',
    q: 'A pod stays Pending and describe shows "0/3 nodes are available: 3 node(s) didn\'t match node selector." What is wrong?',
    options: [
      'The image is missing',
      'No node carries the label required by the pod\u2019s nodeSelector',
      'etcd lost quorum',
      'The container crashed'
    ],
    correctIndex: 1,
    explanation: 'A nodeSelector restricts scheduling to labelled nodes. If no node has the matching label, the scheduler cannot place the pod and it stays Pending.',
    difficulty: 'medium'
  },
  {
    id: 'k8s-scn-m5-8', module: 'm5', section: 's9', type: 'scenario',
    q: 'Several pods across one node suddenly fail. "kubectl get nodes" shows that node as NotReady. What is the most appropriate next diagnostic step?',
    options: [
      'Delete all pods in the cluster',
      'Run "kubectl describe node <node>" to inspect node conditions and events',
      'Recreate the Service',
      'Increase replica counts everywhere'
    ],
    correctIndex: 1,
    explanation: 'Describing the node surfaces its conditions (MemoryPressure, DiskPressure, Ready) and events, which explain why it went NotReady.',
    difficulty: 'medium'
  }

];
