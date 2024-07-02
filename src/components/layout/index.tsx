import { ThemedLayoutV2, ThemedTitleV2 } from "@refinedev/antd"
import Header from "./header"

const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <ThemedLayoutV2 Header={Header} Title={(titleProps => <ThemedTitleV2 {...titleProps} text="ServiceBot Panel"/>)} >{children}</ThemedLayoutV2> // Header is the 
  )
}

export default Layout