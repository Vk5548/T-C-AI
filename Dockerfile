#Use the official Rust image as the base image
FROM rust:latest

#Set the working directory inside the container 
WORKDIR /usr/src/app

# Copy the Cargo.toml and Cargo.lock files to the container
COPY Cargo.toml Cargo.lock ./

# Copy the source code
COPY src ./src

#This will cache the dependencies layer to speed up the build process and it will build the project
RUN cargo build --release

# The default command to run the executable
CMD ["./target/release/t_c_ai"]



#yes, I am new to Rust and docker and for the very first time building a chrome extension; 
# so help me get started with as much detail as possible; step by step; 
# just give me first step in as much detail as possible; also teach me rust concepts and 
# function and anything about Rust that comes along