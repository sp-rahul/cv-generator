import React from 'react';
import {Sidebar} from "flowbite-react";

function SlideBar() {
    return (
        <div>
            <Sidebar aria-label="Sidebar with multi-level dropdown example">
                <Sidebar.Items>
                    <Sidebar.ItemGroup>
                        <Sidebar.Item
                            href="#"
                            // icon={u}
                        >
                            <p>
                                Dashboard
                            </p>
                        </Sidebar.Item>
                        <Sidebar.Collapse
                            // icon={L}
                            label="E-commerce"
                        >
                            <Sidebar.Item href="#">
                                Products
                            </Sidebar.Item>
                            <Sidebar.Item href="#">
                                Sales
                            </Sidebar.Item>
                            <Sidebar.Item href="#">
                                Refunds
                            </Sidebar.Item>
                            <Sidebar.Item href="#">
                                Shipping
                            </Sidebar.Item>
                        </Sidebar.Collapse>
                        <Sidebar.Item
                            href="#"
                            // icon={B}
                        >
                            <p>
                                Inbox
                            </p>
                        </Sidebar.Item>
                        <Sidebar.Item
                            href="#"
                            // icon={P}
                        >
                            <p>
                                Users
                            </p>
                        </Sidebar.Item>
                        <Sidebar.Item
                            href="#"
                            // icon={L}
                        >
                            <p>
                                Products
                            </p>
                        </Sidebar.Item>
                        <Sidebar.Item
                            href="#"
                            // icon={l}
                        >
                            <p>
                                Sign In
                            </p>
                        </Sidebar.Item>
                        <Sidebar.Item
                            href="#"
                            // icon={b}
                        >
                            <p>
                                Sign Up
                            </p>
                        </Sidebar.Item>
                    </Sidebar.ItemGroup>
                </Sidebar.Items>
            </Sidebar>
        </div>
    );
}

export default SlideBar;