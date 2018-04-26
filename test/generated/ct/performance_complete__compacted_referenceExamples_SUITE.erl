%%%-------------------------------------------------------------------
%%% File        : performance_complete__compacted_referenceExamples_SUITE.erl
%%% Description : Test Suite for rule: referenceExamples.
%%%
%%% Created     : 26.04.2018
%%%-------------------------------------------------------------------
-module(performance_complete__compacted_referenceExamples_SUITE).

-export([
    all/0,
    end_per_suite/1,
    init_per_suite/1,
    suite/0,
    test_compacted/1
]).

-include_lib("common_test/include/ct.hrl").
-include_lib("eunit/include/eunit.hrl").

%%--------------------------------------------------------------------
%% COMMON TEST CALLBACK FUNCTIONS - SUITE
%%--------------------------------------------------------------------

suite() ->
    [
        {timetrap, {minutes, 15}}
    ].

init_per_suite(Config) ->
    Config.

end_per_suite(_Config) ->
    ok.

%%--------------------------------------------------------------------
%% COMMON TEST CALLBACK FUNCTIONS - ALL
%%--------------------------------------------------------------------

all() ->
    [
        test_compacted
    ].

%%--------------------------------------------------------------------
%% TEST CASES
%%--------------------------------------------------------------------

test_compacted(_Config) ->
    {ok, _} = sqlparse:parsetree_with_tokens("
        -- =====================================================================
        -- from book:          SQL Language Reference
        --      chapter:       14 SQL Statements: CREATE LIBRARY to CREATE SCHEMA
        --      section:       CREATE SCHEMA
        -- ---------------------------------------------------------------------

        CREATE SCHEMA AUTHORIZATION oe
           CREATE TABLE new_product
              (color VARCHAR2(10), quantity NUMBER)
           CREATE VIEW new_product_view
              AS SELECT color, quantity FROM new_product WHERE color = 'RED'
           GRANT select ON new_product_view TO hr;
    "),
    {ok, _} = sqlparse:parsetree_with_tokens("
        -- =====================================================================
        -- from book:          SQL Language Reference
        --      chapter:       18 SQL Statements: DROP TABLE to LOCK TABLE
        --      section:       GRANT
        -- ---------------------------------------------------------------------

        GRANT dw_manager
           TO sh
           WITH ADMIN OPTION;
    "),
    {ok, _} = sqlparse:parsetree_with_tokens("
        -- =====================================================================
        -- from book:          SQL Language Reference
        --      chapter:       18 SQL Statements: DROP TABLE to LOCK TABLE
        --      section:       GRANT
        -- ---------------------------------------------------------------------

        GRANT dw_manager
           TO sh
           WITH DELEGATE OPTION;
    "),
    {ok, _} = sqlparse:parsetree_with_tokens("
        -- =====================================================================
        -- from book:          SQL Language Reference
        --      chapter:       18 SQL Statements: DROP TABLE to LOCK TABLE
        --      section:       GRANT
        -- ---------------------------------------------------------------------

        GRANT SELECT ON sh.sales TO warehouse_user;
    "),
    {ok, _} = sqlparse:parsetree_with_tokens("
        -- =====================================================================
        -- from book:          SQL Language Reference
        --      chapter:       18 SQL Statements: DROP TABLE to LOCK TABLE
        --      section:       GRANT
        -- ---------------------------------------------------------------------

        GRANT warehouse_user TO dw_manager;
    "),
    {ok, _} = sqlparse:parsetree_with_tokens("
        -- =====================================================================
        -- from book:          SQL Language Reference
        --      chapter:       18 SQL Statements: DROP TABLE to LOCK TABLE
        --      section:       GRANT
        -- ---------------------------------------------------------------------

        GRANT ALL ON bonuses TO hr
           WITH GRANT OPTION;
    "),
    {ok, _} = sqlparse:parsetree_with_tokens("
        -- =====================================================================
        -- from book:          SQL Language Reference
        --      chapter:       18 SQL Statements: DROP TABLE to LOCK TABLE
        --      section:       GRANT
        -- ---------------------------------------------------------------------

        GRANT SELECT, UPDATE
           ON emp_view TO PUBLIC;
    "),
    {ok, _} = sqlparse:parsetree_with_tokens("
        -- =====================================================================
        -- from book:          SQL Language Reference
        --      chapter:       18 SQL Statements: DROP TABLE to LOCK TABLE
        --      section:       GRANT
        -- ---------------------------------------------------------------------

        GRANT SELECT
           ON oe.customers_seq TO hr;
    "),
    {ok, _} = sqlparse:parsetree_with_tokens("
        -- =====================================================================
        -- from book:          SQL Language Reference
        --      chapter:       19 SQL Statements: MERGE to UPDATE
        --      section:       REVOKE
        -- ---------------------------------------------------------------------

        REVOKE DROP ANY TABLE
            FROM hr, oe;
    "),
    {ok, _} = sqlparse:parsetree_with_tokens("
        -- =====================================================================
        -- from book:          SQL Language Reference
        --      chapter:       19 SQL Statements: MERGE to UPDATE
        --      section:       REVOKE
        -- ---------------------------------------------------------------------

        REVOKE dw_manager
            FROM sh;
    "),
    {ok, _} = sqlparse:parsetree_with_tokens("
        -- =====================================================================
        -- from book:          SQL Language Reference
        --      chapter:       19 SQL Statements: MERGE to UPDATE
        --      section:       REVOKE
        -- ---------------------------------------------------------------------

        REVOKE dw_user
          FROM dw_manager;
    "),
    {ok, _} = sqlparse:parsetree_with_tokens("
        -- =====================================================================
        -- from book:          SQL Language Reference
        --      chapter:       19 SQL Statements: MERGE to UPDATE
        --      section:       REVOKE
        -- ---------------------------------------------------------------------

        REVOKE DELETE
           ON orders FROM hr;
    "),
    {ok, _} = sqlparse:parsetree_with_tokens("
        -- =====================================================================
        -- from book:          SQL Language Reference
        --      chapter:       19 SQL Statements: MERGE to UPDATE
        --      section:       REVOKE
        -- ---------------------------------------------------------------------

        REVOKE ALL
           ON orders FROM hr;
    "),
    {ok, _} = sqlparse:parsetree_with_tokens("
        -- =====================================================================
        -- from book:          SQL Language Reference
        --      chapter:       19 SQL Statements: MERGE to UPDATE
        --      section:       REVOKE
        -- ---------------------------------------------------------------------

        REVOKE UPDATE
            ON emp_details_view FROM public;
    "),
    {ok, _} = sqlparse:parsetree_with_tokens("
        -- =====================================================================
        -- from book:          SQL Language Reference
        --      chapter:       19 SQL Statements: MERGE to UPDATE
        --      section:       REVOKE
        -- ---------------------------------------------------------------------

        REVOKE SELECT
            ON hr.departments_seq FROM oe;
    "),
    {ok, _} = sqlparse:parsetree_with_tokens("
        -- =====================================================================
        -- from book:          SQL Language Reference
        --      chapter:       19 SQL Statements: MERGE to UPDATE
        --      section:       REVOKE
        -- ---------------------------------------------------------------------

        REVOKE REFERENCES
            ON hr.employees
            FROM oe
            CASCADE CONSTRAINTS;
    "),
    {ok, _} = sqlparse:parsetree_with_tokens("
        -- =====================================================================
        -- from book:          SQL Language Reference
        --      chapter:       19 SQL Statements: MERGE to UPDATE
        --      section:       REVOKE
        -- ---------------------------------------------------------------------

        REVOKE UPDATE ON hr.employees FROM oe;
    "),
    ok.
