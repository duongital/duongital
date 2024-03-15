> The Internet turned out to be a big deal: understand how it works to unlock its full potential.

![getting started](https://media.giphy.com/media/gegsYiciYvqmA5CwT7/giphy.gif)
*Let's go!*

Common phrases:

- Ethernet: is a family of wired computer networking technologies commonly used in local area networks (LANs), metropolitan area networks (MANs), and wide area networks (WANs).
- Network classified by:
	- area >> LAN, MAN, WAN
	- internal >> open, private
	- bus, star
- OSI model: Open Systems Interconnection is a networking model framework (networking protocol) that describe how data transferred between computer systems on a network. It's like cache layer and each one is responsible for a specific function. This is a {{framework}} and not an implementation.

Other content goes here!

![4 layers](./attachments/20240129-4-layers.png)
*4 layers of transporting packets over Internet*

# implementation in OSI layers

The OSI (Open Systems Interconnection) model is a conceptual framework that helps in understanding and designing network architectures. Various protocols are associated with different layers of the OSI model. Here are some examples:

1. **Physical Layer (Layer 1):**
   - Ethernet (IEEE 802.3)
   - USB (Universal Serial Bus)

2. **Data Link Layer (Layer 2):**
   - Point-to-Point Protocol (PPP)
   - Ethernet (IEEE 802.3)
   - Wi-Fi (IEEE 802.11)

3. **Network Layer (Layer 3):**
   - Internet Protocol (IP)
   - Internet Control Message Protocol (ICMP)

4. **Transport Layer (Layer 4):**
   - Transmission Control Protocol (TCP)
   - User Datagram Protocol (UDP)

5. **Session Layer (Layer 5):**
   - NetBIOS (Network Basic Input/Output System)

6. **Presentation Layer (Layer 6):**
   - Hypertext Transfer Protocol (HTTP)
   - Simple Object Access Protocol (SOAP)

7. **Application Layer (Layer 7):**
   - File Transfer Protocol (FTP)
   - Simple Mail Transfer Protocol (SMTP)

These are just examples, and there are many other protocols that align with different layers of the OSI model. The model helps in conceptualizing the interactions and functions of these protocols in a systematic way.

# OSI model vs TCP/IP model

![osi vs tcp](./attachments/20240126-osi-vs-tcpip.png)
*OSI model is outdated and mostly replaced by TCP/IP model today*

The Open Systems Interconnection (OSI) model is a conceptual framework that standardizes the functions of a network into seven categories or layers. These layers are: Physical, Data Link, Network, Transport, Session, Presentation, and Application. This model is used to understand and describe how different network protocols interact and work together to provide network services [Source 1](https://en.wikipedia.org/wiki/OSI_model), [Source 2](https://aws.amazon.com/what-is/osi-model/), [Source 3](https://www.techtarget.com/searchnetworking/definition/OSI), [Source 4](https://www.forcepoint.com/cyber-edu/osi-model).

- **Physical Layer**: This is the lowest layer of the OSI model. It deals with the physical characteristics of the transmission medium like voltage levels, cable specifications, pin layouts, etc. It includes elements like network cables, hubs, and repeaters [Source 4](https://www.forcepoint.com/cyber-edu/osi-model).

- **Data Link Layer**: This layer provides reliable transfer of frames from one node to another, handling errors that may occur in the Physical layer. It controls how a computer on a network sends and receives data [Source 1](https://en.wikipedia.org/wiki/OSI_model).

- **Network Layer**: This layer is responsible for packet forwarding, including routing through different networks. It selects the best path for data transfer [Source 1](https://en.wikipedia.org/wiki/OSI_model).

- **Transport Layer**: This layer manages error checking and recovery, flow control, and ensures data integrity. It handles the segmentation and reassembly of data packets [Source 1](https://en.wikipedia.org/wiki/OSI_model).

- **Session Layer**: This layer establishes, manages, and terminates connections between applications. It coordinates communication sessions between computers [Source 1](https://en.wikipedia.org/wiki/OSI_model).

- **Presentation Layer**: This layer transforms data into a format that the application layer can accept. It provides a common format for data exchange [Source 1](https://en.wikipedia.org/wiki/OSI_model).

- **Application Layer**: This is the topmost layer of the OSI model where the interface to the software application exists. It provides a set of interfaces for applications to access network services [Source 1](https://en.wikipedia.org/wiki/OSI_model).

The OSI model is important because it provides a common language for computer networking, allowing different technologies to communicate using standard protocols. It encapsulates every type of network communication across both software and hardware components, allowing two standalone systems to communicate via standardized interfaces or protocols [Source 2](https://aws.amazon.com/what-is/osi-model/).

![7 layers](./attachments/20240125-7-layers.png)
*7 layers of OSI model*

![security](attachments/20240314-security.png)
*Security on each layer*