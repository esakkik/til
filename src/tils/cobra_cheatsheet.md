---
title: Cobra cheatsheet
slug: cobra-cheatsheet
description: A cheatsheet to get up and running with cobra
date: 2025-01-9T16:46:27+05:30
tags: [engineering, tech]
---

Here's a concise cheatsheet for Cobra CLI library:

```go
// Basic Structure
package main

import (
    "github.com/spf13/cobra"
)

// 1. Root Command
var rootCmd = &cobra.Command{
    Use:   "app",
    Short: "Short description",
    Long:  `Long description`,
    Run: func(cmd *cobra.Command, args []string) {
        // Root command logic
    },
}

// 2. Sub Commands
var subCmd = &cobra.Command{
    Use:   "sub [arg]",
    Short: "Sub command",
    Args:  cobra.MinimumNArgs(1),
    Run: func(cmd *cobra.Command, args []string) {
        // Sub command logic
    },
}

// 3. Flags
var (
    flag1 string
    flag2 bool
    flag3 int
)

func init() {
    // Persistent Flags (available to all sub commands)
    rootCmd.PersistentFlags().StringVar(&flag1, "flag1", "default", "flag1 description")

    // Local Flags (only for this command)
    rootCmd.Flags().BoolVarP(&flag2, "flag2", "f", false, "flag2 description")
    rootCmd.Flags().IntVar(&flag3, "flag3", 0, "flag3 description")

    // Add sub commands
    rootCmd.AddCommand(subCmd)
}

func main() {
    rootCmd.Execute()
}

// 4. Common Command Properties
cmd := &cobra.Command{
    Use:        "command [args]",    // Command name and args
    Aliases:    []string{"cmd"},     // Alternative names
    Short:      "Short description",
    Long:       `Long description`,
    Example:    `example usage`,
    Version:    "1.0.0",

    // Validation
    Args:       cobra.ExactArgs(2),  // Exactly 2 args
    ArgAliases: []string{"arg1", "arg2"},

    // Hooks
    PersistentPreRun:  func(cmd *cobra.Command, args []string) {},
    PreRun:            func(cmd *cobra.Command, args []string) {},
    Run:               func(cmd *cobra.Command, args []string) {},
    PostRun:           func(cmd *cobra.Command, args []string) {},
    PersistentPostRun: func(cmd *cobra.Command, args []string) {},
}

// 5. Argument Validators
cobra.NoArgs                 // No args allowed
cobra.ExactArgs(n)          // Exactly n args
cobra.MinimumNArgs(n)       // At least n args
cobra.MaximumNArgs(n)       // At most n args
cobra.RangeArgs(min, max)   // Between min and max args

// 6. Flag Types
cmd.Flags().BoolP("bool", "b", false, "bool flag")
cmd.Flags().StringP("string", "s", "", "string flag")
cmd.Flags().IntP("int", "i", 0, "int flag")
cmd.Flags().Float64P("float", "f", 0, "float flag")
cmd.Flags().StringArrayP("array", "a", []string{}, "string array flag")
cmd.Flags().StringSliceP("slice", "l", []string{}, "string slice flag")

// 7. Required Flags
cmd.MarkFlagRequired("flag-name")

// 8. Getting Flag Values
boolVal, _ := cmd.Flags().GetBool("bool")
stringVal, _ := cmd.Flags().GetString("string")
intVal, _ := cmd.Flags().GetInt("int")

// 9. Custom Help
cmd.SetHelpCommand(cmd *Command)    // Custom help command
cmd.SetHelpFunc(f func(*Command, []string))  // Custom help function
cmd.SetHelpTemplate(`{{.Help}}`)    // Custom help template

// 10. Error Handling
cmd.SilenceErrors = true    // Don't print errors
cmd.SilenceUsage = true     // Don't display usage on error

// 11. Command Groups
cmd.AddGroup(&cobra.Group{
    ID:    "group1",
    Title: "Group Title",
})
cmd.GroupID = "group1"      // Assign command to group
```

Common Usage Examples:

```go
// Basic Command with Flags
var rootCmd = &cobra.Command{
    Use:   "git",
    Short: "Git is a distributed version control system",
    Run: func(cmd *cobra.Command, args []string) {
        verbose, _ := cmd.Flags().GetBool("verbose")
        if verbose {
            fmt.Println("Verbose output")
        }
    },
}

func init() {
    rootCmd.Flags().BoolP("verbose", "v", false, "verbose output")
}

// Sub Command with Required Flag
var cloneCmd = &cobra.Command{
    Use:   "clone [url]",
    Short: "Clone a repository",
    Args:  cobra.ExactArgs(1),
    Run: func(cmd *cobra.Command, args []string) {
        depth, _ := cmd.Flags().GetInt("depth")
        fmt.Printf("Cloning %s with depth %d\n", args[0], depth)
    },
}

func init() {
    cloneCmd.Flags().Int("depth", 1, "Create a shallow clone")
    cloneCmd.MarkFlagRequired("depth")
    rootCmd.AddCommand(cloneCmd)
}
```

Key Points:

- Use `PersistentFlags` for flags available to all sub commands
- Use regular `Flags` for command-specific flags
- Add `-P` suffix to flag functions for short flag names
- Use `MarkFlagRequired()` for mandatory flags
- Implement `PreRun` and `PostRun` hooks for setup/cleanup
- Use `SilenceErrors` and `SilenceUsage` for custom error handling
- Group related commands using `AddGroup`
